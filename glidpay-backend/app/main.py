from fastapi import  FastAPI
from enum import Enum

app = FastAPI()

@app.get("/", description="This is our first route", deprecated=True)

async def root():
    return{"message": "hello world"}


@app.post("/")
async def post():
    return{"message": "hello from the post route"}

@app.put("/")
async def put():
    return{"message": "hello from the get route"}


@app.get("/items")
async def list_items():
    return{"message": "list of items"}

@app.get("/items/{items_id}")
async def get_item(items_id: float):
    return{"item_id": items_id}


class FoodEnum(str, Enum):
    fruits = "fruits"
    vegetables = "vegetables"
    alcohol = "alcohol"

@app.get("/foods/{food_list}")
async def get_food(food_list: FoodEnum):
    if food_list == FoodEnum.fruits:
        return{"food_name": food_list, "message": "Your are healthy but like sweet things" }
    
    if food_list.value == "vegetables":
        return{
            "foodName": food_list,
            "message": "You are still healthy"
        }
    if food_list == FoodEnum.alcohol:
        return{
            "FoodName": food_list,
            "message": "You are getting unhealthy with too much alcohol"
        }
    return{"foodName": food_list, "message": "I want chocolated slike"}

users = {
    1: "Emmanuel",
    2: "Calero",
    3: "Edwarn",
    4: "Asheri",
    5: "Lynne"
}
    
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    if user_id not in users:
        return{
            "Error": "user not found!!"
        }
    return{
        "User_id": user_id,
        "User_name": users[user_id]
    }
