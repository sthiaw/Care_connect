export const PROFILE_STORE_KEY='careconnect:demo-profiles:v1'
export const ACTIVE_PROFILE_KEY='careconnect:active-profile:v1'

export function cleanUsername(value){return String(value||'').trim()}

export function validateUsername(value){
  const username=cleanUsername(value)
  if(username.length<3||username.length>24)return 'Use 3–24 characters.'
  if(!/^[A-Za-z0-9_.-]+$/.test(username))return 'Use letters, numbers, dots, hyphens or underscores only.'
  return ''
}

export function readProfiles(storage){
  try{
    const value=JSON.parse(storage.getItem(PROFILE_STORE_KEY)||'{}')
    return value&&typeof value==='object'&&!Array.isArray(value)?value:{}
  }catch{return{}}
}

export function writeProfiles(storage,profiles){storage.setItem(PROFILE_STORE_KEY,JSON.stringify(profiles))}

export function createProfile(storage,value,record){
  const username=cleanUsername(value)
  const validationError=validateUsername(username)
  if(validationError)return{error:validationError}
  const profiles=readProfiles(storage)
  const existing=Object.keys(profiles).find(name=>name.toLowerCase()===username.toLowerCase())
  if(existing)return{error:existing===username?'That username already exists. Sign in instead.':`Capitalization matters. Use the existing username “${existing}”.`}
  profiles[username]={...record,username,updatedAt:new Date().toISOString()}
  writeProfiles(storage,profiles)
  storage.setItem(ACTIVE_PROFILE_KEY,username)
  return{username,record:profiles[username]}
}

export function loginProfile(storage,value){
  const username=cleanUsername(value)
  const validationError=validateUsername(username)
  if(validationError)return{error:validationError}
  const profiles=readProfiles(storage)
  if(profiles[username]){
    storage.setItem(ACTIVE_PROFILE_KEY,username)
    return{username,record:profiles[username]}
  }
  const existing=Object.keys(profiles).find(name=>name.toLowerCase()===username.toLowerCase())
  if(existing)return{error:`Username capitalization is incorrect. Enter “${existing}” exactly.`}
  return{error:'Username not found. Create a profile first.'}
}

export function getActiveProfile(storage){
  const username=storage.getItem(ACTIVE_PROFILE_KEY)||''
  const profiles=readProfiles(storage)
  return username&&profiles[username]?username:''
}

export function updateProfileData(storage,username,patch){
  const profiles=readProfiles(storage)
  if(!profiles[username])return false
  profiles[username]={...profiles[username],...patch,username,updatedAt:new Date().toISOString()}
  writeProfiles(storage,profiles)
  return true
}

export function signOutProfile(storage){storage.removeItem(ACTIVE_PROFILE_KEY)}

