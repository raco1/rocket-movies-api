const { Router } = require('express');
const ensureAuthenticated = require("../middleware/EnsureAuthentication")

const notesRoutes = Router();

const NotesController = require('../controllers/NotesController');

const notesController =  new NotesController();

notesRoutes.use(ensureAuthenticated)

notesRoutes.post("/", notesController.create);
notesRoutes.delete("/:id", notesController.delete);
notesRoutes.get("/:id", notesController.show);
notesRoutes.get("/", notesController.index);

module.exports = notesRoutes;