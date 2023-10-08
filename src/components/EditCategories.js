import React, { useState } from "react";

export default function EditCategories({ categories, setCategories }) {

  const [newCategory, setNewCategory] = useState("")

  function displayEditCategoriesModal(display) {
    var editCategoriesModal = document.getElementById("editCategoriesModal");
    if (display === true) {
      editCategoriesModal.style.display = "block";
    } else {
      editCategoriesModal.style.display = "none";
      setNewCategory('')
      return;
    }
  }

  function addNewCategory() {
    if (newCategory === "") {
      return alert("Enter a category")
    }
    setCategories((prevState) => [...prevState, newCategory]);
    setNewCategory('')
  }

  function deleteCategory(value) {
    if (categories.length === 1) {
      return alert("You must have at least one category")
    }
    categories.forEach((element) => {
      if (element === value) {
        categories.splice(categories.indexOf(element), 1);
      }
    });
    setCategories([...categories]);
    localStorage.setItem("categories", JSON.stringify(categories));
  }

  return (
    <div>
      <button onClick={() => displayEditCategoriesModal(true)}>
        Edit categories
      </button>
      <div id="editCategoriesModal" className="modal">
        <div className="modal-content">
          <span
            onClick={() => displayEditCategoriesModal(false)}
            className="close"
          >
            &times;
          </span>
            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              type="text"
            />
            <button onClick={() => addNewCategory()}>Add Category</button>
            {categories.map((element) => {
              return (
                <div>
                  <p>{element}</p>
                  <svg
                    onClick={(e) => deleteCategory(element)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </svg>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
