import { useRef } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux";
import globalReducer from "@/state/index";
import { api } from "@/state/api";
import { setupListeners } from "@reduxjs/toolkit/query";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

/**
 * Sunucu tarafında storage desteği olmadığı için noop storage oluşturur.
 * Bu, SSR sırasında redux-persist'in çalışmasını engellemeden bir placeholder görevi görür.
 */
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

/**
 * Uygulamanın çalıştığı ortama göre (server/client) uygun storage'ı belirler.
 * SSR'da noop, client'ta localStorage kullanılır.
 */
const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

/**
 * redux-persist yapılandırması: hangi reducer'ların persist edileceği ve storage tipini belirler.
 */
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["global"],
};

/**
 * Uygulamadaki tüm reducer'ları birleştirir.
 * Hem global slice'ı hem de redux-toolkit query reducer'ı ekler.
 */
const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});

/**
 * redux-persist ile sarılmış reducer'ı oluşturur.
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Redux store'unun oluşturulduğu fonksiyon.
 * Middleware olarak hem default middleware'lar hem de api.middleware eklenir.
 * Ayrıca persist işlemlerinde hata çıkmasını önleyecek bazı aksiyonlar serializable check’ten hariç tutulur.
 */
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefault) =>
      getDefault({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
  });
};

/**
 * Redux ile ilgili TypeScript tiplerini projede tekrar kullanabilmek için tipler export edilir.
 */
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * React component olarak StoreProvider.
 * Store ve persist işlemlerini context ile sağlar.
 * Provider ile redux store'u ve PersistGate ile persist işleminin tamamlanmasını bekletir.
 */
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }
  const persistor = persistStore(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
