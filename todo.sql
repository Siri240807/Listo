-- Step 1: Create database
CREATE DATABASE IF NOT EXISTS todo;

-- Step 2: Use it
USE todo;

-- Step 3: Create the table
CREATE TABLE IF NOT EXISTS todoItems (
    ID INT AUTO_INCREMENT PRIMARY KEY,   -- unique ID for each to-do
    itemDescription VARCHAR(255),        -- the text of the task
    completed BOOLEAN DEFAULT FALSE      -- false = not done, true = done
);

-- Step 4: Add one sample item
INSERT INTO todoItems (itemDescription)
VALUES ('Sample Task');
