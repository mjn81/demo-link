import { Router } from "express";
import { roomController } from "../controllers";

const router = Router();

router.get('/', roomController.getRoomsByName);
router.post('/', roomController.createRoom);
router.get('/all' , roomController.getAllRooms);
router.post('/self', roomController.createSelfRoom);
router.get('/self', roomController.getMyRooms);
router.put('/:id', roomController.addRecipient);
router.delete('/:id', roomController.removeRecipient);
router.put('/name/:id', roomController.changeRoomName);

export const roomRouter = router;