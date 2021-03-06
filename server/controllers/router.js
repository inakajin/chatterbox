const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {basicStrategy, jwtStrategy} = require('./strategies');
const router = express.Router();
const jsonParser = bodyParser.json();
const EntryController = require('./entries');
const UsersController = require('./users');
const AuthController = require('./auth');
const RoomController = require('./rooms');

//Register User
router.post('/register', jsonParser, UsersController.register);

//Login User
router.post('/login', passport.authenticate('basic', {session: false}), AuthController.login);

//Retrieve users
router.get('/getusers', jsonParser, UsersController.getUsers);

//Refresh Token
router.post('/refresh', passport.authenticate('jwt', {session: false}), AuthController.refresh);

//Add Entry
router.post('/add', [passport.authenticate('jwt', {session: false}), jsonParser], UsersController.addEntry);

//Get all rooms
router.get('/getrooms', jsonParser, RoomController.getRooms);

//Get Room
router.get('/room/:id', [passport.authenticate('jwt', {session: false}), jsonParser],EntryController.getchathistory);

//Create Room
router.post('/addroom', [passport.authenticate('jwt', {session: false}), jsonParser],RoomController.createRoom);

module.exports = {router, basicStrategy, jwtStrategy};