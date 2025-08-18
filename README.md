# EPI-USE-Technical-Assessment

<<<<<<< Updated upstream
This repository will be used to complete the technical assessment provided by EPI-USE for an internship opportunity
=======

# User Manual

[Application](https://epi-use-employee-management.onrender.com)

## How to use

1. Navigate to the application using the link above (or click [here](https://epi-use-employee-management.onrender.com))
2. You will be brought to the home page where you can use the quick links or the navigation bar to switch between pages

### View page

The view page has two tabs/views that you can choose from:

(_The following images use example data from the database_)

1. Table View  
   This is the default view and displays all employees in a tabular format.

   ![Employee Table](./imgs/Employee%20Table.png)

   You can use the table view to search for a specific employee or click the table headers to sort the list (the first click sorts alphabetically/ascending, the second click reverses the order, and the third click will remove the sort and return to the original data).

   Additionally, you can perform more actions on each employee in the table by clicking the 3 dots at the end of each row. Doing this will open a context menu where you can choose from more options.

   ![Context menu](./imgs/Context%20menu.png)

   Choosing View opens up an employee card with more details about them and a profile image that they can set on Gravatar.

   ![Employee Card](./imgs/Employee%20Card.png)

   Choosing Edit will open a popup window and allow you to change any of the employee's details.

   ![Edit employee](./imgs/Edit%20popup.png)

   And finally, choosing Delete will cause a confirmation window to show up and, upon confirmation, will remove the selected employee from the database.

2. Tree View  
   This view will display the hierarchy of the organisation. Each employee is represented by a node in the tree, with managers being parent nodes and employees who do not manage any other employees being leaf nodes.

   ![Employee tree](./imgs/Employee%20tree.png)

   Every node has a couple of actions associated with them.
   Firstly, when hovering over a specific node, a small window will pop up with more information on that employee.

   ![Employee info](./imgs/Expand%20info.png)

   And lastly, each parent node can be clicked to either expand or collapse the children nodes so you can change the look of the tree to your preference.

   ![Node expand](./imgs/Node%20expand.png) ![Node collapse](./imgs/Node%20collapse.png)

### Add page

Here you can add new employees to the system by completing the form.

![Add employee](./imgs/Add%20employee.png)  
(Please note that all fields are required - only the Manager field does not need a specific value - and that Employee Number and Email are unique fields).

> > > > > > > Stashed changes
