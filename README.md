# 🏒 Mora9 Hockey Event - Points Table

I am happy to publish this with you! This project showcases the preview points table of the matches for Mora9's hockey event (Boys and Girls Inter-University) organized by the University of Moratuwa. This includes:

- 📋 **Hockey Teams** (Women's and Men's) categorized into Team A, Team B, etc.
- 📊 **Points Table Calculation**: Displaying all data related to match points and automatically calculating the points based on match results.
- 📜 **Match History**: You can also view the history of past matches for reference.

## 🌐 Demo Link

🔗 [Visit the Demo](https://mora9s.vercel.app/)

## 🖼️ Images

<img src="https://github.com/user-attachments/assets/64432296-570c-45a0-80fe-f538bfadd0e3" alt="Boys Points Table" width="400px">

<img src="https://github.com/user-attachments/assets/7a4002e9-0507-424f-8cfe-4061accc2452" alt="Girls Points Table" width="400px">

<img src="https://github.com/user-attachments/assets/320b5e44-13c7-46c8-b6c6-036eccba4348" alt="Match History - Boys" width="400px">

## 🔨 How It Works

- All the data is managed via simple `.xlsx` files located in the `src/data_Sheets/` directory.
- Whenever you want to update the points table or match history, simply modify the relevant `.xlsx` files, and the changes will reflect on the website.

## 📁 Data Structure

The data is organized as follows:
```
src/
│
├── data_Sheets/
│   ├── mens_points_table.xlsx
│   ├── womens_points_table.xlsx
│   └── match_history.xlsx
│
├── Images/
├── Scripts/
|__ Index.html
|__pointtable_boys.html
|__pointtable_girls.html
|__history_boys.html
|__history_girls.html
```

## 🚀 Features
- Automatic calculation of points.
- Easy updating through `.xlsx` files.
- Separate points tables for Men's and Women's matches.
- Match history tracking.
- If you want to change points calculations, you can change equations of `.xlsx` file.

## 📅 Future Enhancements
- Adding more statistics and analytics for better insights.
- Making the website fully responsive for mobile users.

Feel free to explore and contribute! 😊

