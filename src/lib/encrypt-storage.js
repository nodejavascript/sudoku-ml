import { EncryptStorage } from 'encrypt-storage'

const { REACT_APP_ENCRYPT_STORAGE_KEY } = process.env

const encryptStorage = new EncryptStorage(REACT_APP_ENCRYPT_STORAGE_KEY)

export const getStorageItem = key => encryptStorage.getItem(key)

export const setStorageItem = (key, value) => {
  if (value) encryptStorage.setItem(key, value)
  if (!value) encryptStorage.removeItem(key)
}
