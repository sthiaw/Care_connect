import test from'node:test'
import assert from'node:assert/strict'
import{ACTIVE_PROFILE_KEY,createProfile,getActiveProfile,loginProfile,readProfiles,signOutProfile,updateProfileData}from'./demoStore.js'

function memoryStorage(){const values=new Map();return{getItem:key=>values.has(key)?values.get(key):null,setItem:(key,value)=>values.set(key,String(value)),removeItem:key=>values.delete(key)}}

test('creates and restores an exact-case demo profile',()=>{
  const storage=memoryStorage()
  const created=createProfile(storage,'Shantanu',{profile:{patient_name:'Mrs. Sharma'},tasks:[]})
  assert.equal(created.username,'Shantanu')
  assert.equal(getActiveProfile(storage),'Shantanu')
  signOutProfile(storage)
  assert.equal(getActiveProfile(storage),'')
  assert.equal(loginProfile(storage,'shantanu').error,'Username capitalization is incorrect. Enter “Shantanu” exactly.')
  assert.equal(loginProfile(storage,'Shantanu').username,'Shantanu')
})

test('keeps dashboard data after sign out and exact-case re-login',()=>{
  const storage=memoryStorage()
  createProfile(storage,'Riya',{profile:{patient_name:'Mrs. Sharma'},tasks:[]})
  updateProfileData(storage,'Riya',{tasks:[{id:'meds',done:true}]})
  signOutProfile(storage)
  assert.equal(storage.getItem(ACTIVE_PROFILE_KEY),null)
  loginProfile(storage,'Riya')
  assert.deepEqual(readProfiles(storage).Riya.tasks,[{id:'meds',done:true}])
})

test('rejects duplicate usernames regardless of capitalization',()=>{
  const storage=memoryStorage()
  createProfile(storage,'CareUser',{profile:{},tasks:[]})
  assert.match(createProfile(storage,'careuser',{profile:{},tasks:[]}).error,/Capitalization matters/)
  assert.match(createProfile(storage,'CareUser',{profile:{},tasks:[]}).error,/already exists/)
})

