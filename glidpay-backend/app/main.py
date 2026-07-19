from fastapi import  FastAPI, Query
from enum import Enum
from pydantic import BaseModel, Field, HttpUrl, Body

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
 
fake_items_db = ({"item_name": "foo"}, {"item_name": "boas"}, {"item_name": "bez"})

@app.get("/item")
async def lists_items(skip: int, limit: int = 10):
    return fake_items_db[skip: skip+limit]

@app.get("/item/{id}")
async def get_id(id: str, q: str | None=None, short: bool=False):
    item = {"id": id}
    if q:
        item.update({"q": q})
    if not short:
        item.update({"description": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."})

    return item

class item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None


@app.post("/item")
async def create_item(item: item):
    item_dict = item.dict()
    if item.tax:
        price_with_tax = item.price + item.tax
        item_dict.update({
            "price_with_tax": price_with_tax
        })
    return item_dict

@app.put("/items/{item_id}")
async def create_item_with_put(item_id: int, item: item, q: str | None = Query(None, max_length=10)):
    result = {"item_id": item_id, **item.dict()}
    if q:
        result.update({"q": q})
    return result


class Fields(BaseModel):
    name: str
    description: str | None = Field(None, title="This is the description", max_length = 350)
    price: float = Field(..., gt= 0, description = "Price > 0")
    tax: float

@app.post("/field")
async def enter_fields(Fields: Fields ):
    if Fields.name:
        return{"Name": Fields.name}
    if Fields.price:
        return{"price": Fields.price}
    if Fields.tax:
        total_price = Fields.tax + Fields.price
        return{"total_price": total_price}
    
class Image(BaseModel):
    url: HttpUrl
    name: str
class Items(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None
    tags: list[str] = []
    image: Image | None = None

class Offer(BaseModel):
    name: str
    description: str | None = None
    price: float
    items: list[Items] 

@app.put("/item/{items01_id}")
async def update_item(items01_id: int, item: Items):
    result = {"item_idem": items01_id, "item": item}
    return result

@app.post("/offer")
async def create_offer(offers: Offer = Body(..., embed=True)):
    return offers