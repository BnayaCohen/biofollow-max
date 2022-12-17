import { httpService } from './http-service.js'

export const userService = {
  getById,
  // signup,
  // login,
  // logout,
  // getLoggedInUser,
  query,
}

const USER_STORAGE_KEY = 'loggedinUser'

async function query(filterBy = null) {
  try {
    return await httpService.get('user', { params: filterBy })
  } catch (err) {
    console.log('Cannot get users', err)
  }
}

async function getById(userId) {
  try {
    return await httpService.get(`user/${userId}`)
  } catch (err) {
    console.log(err)
    console.error('Something went wrong try again later')
  }
}

// async function login(credentials) {
//   try {
//     const user = await httpService.post('auth/login', credentials)
//     _saveToSession(user)
//     return user
//   } catch (err) {
//     console.log('Cannot login', err)
//   }
// }

// async function signup(signupInfo) {
//   try {
//     const user = httpService.post('auth/signup', signupInfo)
//     _saveToSession(user)
//     return user
//   } catch (err) {
//     console.log(err)
//     throw new Error('Failed to signup try again later')
//   }
// }

// async function logout() {
//   try {
//     sessionStorage.removeItem(USER_STORAGE_KEY)
//     return await httpService.post('auth/logout')
//   } catch (err) {
//     console.log('cannot logout', err)
//   }
// }

// function getLoggedInUser() {
//   if (!sessionStorage.getItem(USER_STORAGE_KEY)) {
//     const guest = getDefaultGuest()
//     return _saveToSession(guest)
//   } else return JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY))
// }

// function _saveToSession(value) {
//   sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(value))
//   return value
// }