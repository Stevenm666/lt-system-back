const express = require("express");
// database
const db = require("../connect/connection");
// utils
const utils = require("../utils/utils");
// login router const
const boxMovementRouter = express.Router();

boxMovementRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const queryById = `SELECT * FROM box_movement WHERE id_box=${id}`;
    const data = await db.handleQuery(queryById);
    let price_total = 0;
    for (let element of data) {
      if (element?.type == 1) {
        price_total += element.price;
      } else {
        price_total -= element.price;
      }
    }
    res.json({
      status: "success",
      message: "success",
      data: {
        price_total,
        data,
      },
    });
  } catch (e) {
    utils.errorReponse(res, 500, e);
  }
});

boxMovementRouter.post("/incomes", async (req, res) => {
  try {
    const {
      consecutive,
      type_income,
      price,
      observation,
      id_box,
      user_creator,
      user_updated,
      type,
      status,
    } = req.body;

    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    const queryCount = `SELECT id FROM box_movement ORDER BY id DESC`;
    const countId = await db.handleQuery(queryCount);
    const numberID = countId?.length > 0 ? countId[0]?.id + 1 : 1;
    const queryCreate = `INSERT INTO box_movement (consecutive, type, id_box, observations, created_at, user_creator, updated_at, user_update, status, price, type_income) VALUES ("${consecutive}-${numberID}",  ${type},  ${id_box}, "${observation}", "${date}", "${user_creator}", "${date}", "${user_updated}", ${status}, ${price}, ${type_income} )`;
    const data = await db.handleQuery(queryCreate);

    utils.sucessResponse(res, data, "success");
  } catch (e) {
    utils.errorReponse(res, 500, e);
  }
});

boxMovementRouter.post("/outcomes", async (req, res) => {
  try {
    const {
      id_box,
      observation,
      price,
      type,
      user_creator,
      user_updated,
      status,
    } = req.body;
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    const queryCreate = `INSERT INTO box_movement (consecutive, type, id_box, observations, created_at, user_creator, updated_at, user_update, status, price, type_income) VALUES (NULL,  ${type},  ${id_box}, "${observation}", "${date}", "${user_creator}", "${date}", "${user_updated}", ${status}, ${price}, NULL)`;
    const data = await db.handleQuery(queryCreate);
    utils.sucessResponse(res, data, "success");
  } catch (e) {
    utils.errorReponse(res, 500, e);
  }
});

boxMovementRouter.get("/close/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const queryMovement = `SELECT * FROM box_movement WHERE id_box = ${id}`;
    const allMovements = await db.handleQuery(queryMovement);
    const data = {
      cash: 0,
      bancolombia: 0,
      nequi: 0,
      daviplata: 0,
      card: 0,
      outcomes: 0,
    };

    for (const element of allMovements) {
      if (element?.type_income) {
        switch (element.type_income) {
          case 1:
            data["cash"] += element?.price;
            break;
          case 2:
            data["bancolombia"] += element?.price;
            break;
          case 3:
            data["nequi"] += element?.price;
            break;
          case 4:
            data["daviplata"] += element?.price;
            break;
          case 5:
            data["card"] += element?.price;
            break;
          default:
            return;
            break;
        }
      } else {
        data["outcomes"] += element?.price;
      }
    }
    utils.sucessResponse(res, [data], "success");
  } catch (e) {
    console.log(e);
  }
});

module.exports = boxMovementRouter;
