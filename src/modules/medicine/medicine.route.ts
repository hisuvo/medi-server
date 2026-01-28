import { Router } from "express";
import { medicineController } from "./medicine.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../constants/user-role";

const router = Router();

router.get("/", medicineController.getMedicines);

router.get("/:medicineId", medicineController.getMedicineById);

router.post("/", auth(UserRole.SELLER), medicineController.createMedicine);

router.put(
  "/:medicineId",
  auth(UserRole.SELLER),
  medicineController.updateMedicine,
);

router.delete(
  "/:medicineId",
  auth(UserRole.SELLER),
  medicineController.deleteMedicine,
);

export { router as medicineRouter };

/**
 * [
  {
    "name": "Napa",
    "description": "Napa contains Paracetamol. Used to reduce fever and pain.",
    "price": 1.5,
    "quantity": 500,
    "image": "https://example.com/images/napa.jpg"
  },
  {
    "name": "Napa Extra",
    "description": "Napa Extra provides stronger relief from headache, body pain, and fever.",
    "price": 2.0,
    "quantity": 300,
    "image": "https://example.com/images/napa-extra.jpg"
  },
  {
    "name": "Ace",
    "description": "Ace is used for fever, toothache, and mild to moderate pain.",
    "price": 1.2,
    "quantity": 400,
    "image": "https://example.com/images/ace.jpg"
  },
  {
    "name": "Seclo",
    "description": "Seclo is used to treat acidity, heartburn, and gastric problems.",
    "price": 5.0,
    "quantity": 200,
    "image": "https://example.com/images/seclo.jpg"
  },
  {
    "name": "Antacid Plus",
    "description": "Antacid Plus helps relieve acidity and indigestion.",
    "price": 3.5,
    "quantity": 250,
    "image": "https://example.com/images/antacid-plus.jpg"
  }
]

 */
