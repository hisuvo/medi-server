import express, { Router } from "express";
import { categoryController } from "./category.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../constants/user-role";

const router: Router = express.Router();

router.get("/", categoryController.getCategory);

router.post("/", auth(UserRole.ADMIN), categoryController.createCategory);

export { router as categoryRouter };

// const x = [
//   {
//     id: "1",
//     name: "Pain Relief",
//     description:
//       "Medicines for relieving mild to moderate pain such as headaches, muscle aches, or arthritis. Includes acetaminophen, ibuprofen, and aspirin.",
//   },
//   {
//     id: "2",
//     name: "Cold & Flu",
//     description:
//       "Medicines for alleviating symptoms of cold, flu, and allergies, such as decongestants, antihistamines, cough syrups, and nasal sprays.",
//   },
//   {
//     id: "3",
//     name: "Digestive Health",
//     description:
//       "OTC medicines for digestive issues like heartburn, indigestion, constipation, or diarrhea, including antacids, laxatives, and probiotics.",
//   },
//   {
//     id: "4",
//     name: "Skin Care & Topical",
//     description:
//       "Creams, ointments, and gels for treating minor skin problems such as rashes, acne, fungal infections, or insect bites.",
//   },
//   {
//     id: "5",
//     name: "Vitamins & Supplements",
//     description:
//       "Dietary supplements, vitamins, and minerals to support overall health, immunity, and nutrition.",
//   },
//   {
//     id: "6",
//     name: "Oral Care",
//     description:
//       "Toothpaste, mouthwash, dental floss, and other oral hygiene products for preventing cavities, gum disease, and bad breath.",
//   },
//   {
//     id: "7",
//     name: "Eye Care",
//     description:
//       "Eye drops and lubricants for dryness, irritation, or minor eye discomfort.",
//   },
//   {
//     id: "8",
//     name: "Ear Care",
//     description:
//       "Ear drops and solutions for minor ear problems, including wax buildup and irritation.",
//   },
//   {
//     id: "9",
//     name: "Allergy Relief",
//     description:
//       "Antihistamines, nasal sprays, and eye drops for relief from seasonal and environmental allergies.",
//   },
//   {
//     id: "10",
//     name: "Cold Sores & Mouth Ulcers",
//     description:
//       "Topical creams, gels, and ointments to relieve pain and speed healing of cold sores and mouth ulcers.",
//   },
//   {
//     id: "11",
//     name: "Smoking Cessation",
//     description:
//       "Products like nicotine gums, patches, and lozenges to help quit smoking.",
//   },
//   {
//     id: "12",
//     name: "Sleep & Relaxation",
//     description:
//       "OTC medicines and supplements for temporary sleep problems and relaxation, including melatonin and herbal aids.",
//   },
//   {
//     id: "13",
//     name: "First Aid & Wound Care",
//     description:
//       "Bandages, antiseptics, and creams for minor cuts, scrapes, burns, and injuries.",
//   },
//   {
//     id: "14",
//     name: "Foot Care",
//     description:
//       "Medications for minor foot problems such as athlete's foot, corns, calluses, and fungal infections.",
//   },
//   {
//     id: "15",
//     name: "Hair Care",
//     description:
//       "Shampoos, conditioners, and topical treatments for dandruff, hair loss, or scalp irritation.",
//   },
//   {
//     id: "16",
//     name: "Men’s Health",
//     description:
//       "OTC products related to men’s health issues, including sexual wellness, prostate support, and supplements.",
//   },
//   {
//     id: "17",
//     name: "Women’s Health",
//     description:
//       "OTC medicines and supplements for menstrual health, menopause support, and general wellness.",
//   },
//   {
//     id: "18",
//     name: "Weight Management & Nutrition",
//     description:
//       "Supplements and aids for weight management, metabolism support, and overall nutrition.",
//   },
//   {
//     id: "19",
//     name: "Urinary & Kidney Health",
//     description:
//       "OTC products for minor urinary problems, including urinary tract support supplements and pain relief.",
//   },
//   {
//     id: "20",
//     name: "Cold & Flu Prevention",
//     description:
//       "Products like vitamins, immune boosters, and herbal remedies to help prevent colds and flu.",
//   },
//   {
//     id: "21",
//     name: "Anti-fungal & Anti-bacterial",
//     description:
//       "Topical and oral OTC treatments for fungal and bacterial infections on skin, nails, and hair.",
//   },
//   {
//     id: "22",
//     name: "Digestive Enzymes",
//     description:
//       "Supplements that help with digestion and absorption of nutrients, including lactase and multi-enzyme products.",
//   },
// ];
