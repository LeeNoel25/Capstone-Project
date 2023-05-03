# RabbitMart

## Technologies & Tools used

- MongoDB, Mongoose
- Express
- React
- Node
- Material UI
- Github

## Timeframe

- 1 week

## Description

This project represents my take on an online pet shop. This application was my capstone project while I was attending the Software Engineering Immersive course at General Assembly.

The purpose of this capstone project was to consolidate my 3-month learning journey, and to showcase my ability to build a full-stack application from scratch.

![homepage](public/readme_resource/Homepage.png)

## Deployment

The application can be found at: https://embarrassed-ant-beanie.cyclic.app

## User Stories

| As a Guest, when I...            | I want to be able to...                                                                                                           |
| :------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| View the Home Page               | - See a picture carousel<br>- See some recipes recently created<br>- See some recipes that have significant view numbers          |
| Click on each individual product | See a page containing details pertaining to that product:<br>- Product Picture<br>- Product name, description, price<br>- Ratings |
| Use the search feature/bar       | Show products based on their: Name, brand, price, etc                                                                             |

| As a member, when I...     | I want to be able to...                                                    |
| :------------------------- | :------------------------------------------------------------------------- |
| View the product details   | - Favourite the product<br>- Submit a rating<br>- Submit multiple comments |
| Access My Account features | - See a list of products I favourited                                      |

## Project Architecture

The project utilises the MVC approach, separating "src", "models", "routes" and "controllers" into different compartments. Data manipulation was done within "models" and "controllers" to render the frontend view.

![ERD](public/readme_resource/ERD.png)

## Future Development

Possible improvements could include:

- Feature to upload multiple image files
- Feature to show when products are on sale / out of stock
