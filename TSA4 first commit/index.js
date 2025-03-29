document.addEventListener("DOMContentLoaded", function () {
    const restaurantData = {
        restaurant1: {
            name: "APPETIZERS",
            menu: "Nono’s Homestyle Fried Chicken Tenders, Truffle Cheese Wontons, Buffalo Cauliflower "

        },

        restaurant2: {
            name: "STEAKS",
            menu: "Garlic Steak w/ Mushroom, Pepito Steak and Eggs, Pinoy Style Beef Steak"
        },

        restaurant3: {
            name: "CHICKENS",
            menu: "Nono’s Homestyle Fried Chicken, Chicken Lettuce Wrap, Fried Chicken Skin "
        },
        restaurant4: {
            name: "PARTY PLATTERS",
            menu: "Grilled Salmon, Lobster Bisque, Shrimp Pasta"
        },

        restaurant5: {
            name: "PASTA",
            menu: "Tomato & Basil Spaghetti, Penne Pasta with Mixed Vegetables, Pesto Cream with Grilled Chicken"
        },
        restaurant6: {
            name: "DESSERTS",
            menu: "Waffle w/ Ice Cream, Almond Crunch Sundae, Banana Cream Pie Mini"
        }
    };

    document.querySelectorAll(".restaurant-img").forEach(img => {
        img.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            if (restaurantData[id]) {
                document.getElementById("restaurantTitle").textContent = restaurantData[id].name;
                document.getElementById("restaurantDetails").textContent = restaurantData[id].details;
                document.getElementById("restaurantMenu").textContent = restaurantData[id].menu;
                new bootstrap.Modal(document.getElementById("restaurantModal")).show();
            }
        });
    });
});