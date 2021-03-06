const addCategoryBtn = document.getElementById("add_category_btn");
const refreshCategoriesBtn = document.getElementById("refresh_categories_btn");

const categoriesTable = document.getElementById("categoriesTable");

function onCreateNewCategory() {
  let bookName = document.getElementById("cname").value;
  if (!bookName) {
    alert("Could not create Category!");
    return;
  }

  axios
    .post(BASE_URL + "/categories/data", { n: bookName })
    .then(function (response) {
      getAllCategories();
    })
    .catch(function (error) {
      console.log("error:", error);
      alert("Could not create Category!");
    });

  document.getElementById("form_inputs").innerHTML = "";

  closeCreateForm();
}

function getAllCategories() {
  axios
    .get(BASE_URL + "/categories/data")
    .then(function (response) {
      let categories = response.data;
      showCategories(categories);
    })
    .catch(function (error) {
      console.log("error:", error);
    });
}

function showCategories(categories) {
  let html = "";

  for (i = 0; i < categories.length; i++) {
    html += `<tr>
    <th scope="row">${i + 1}</th>
    <td>${categories[i].name}</td>
    <td><button class="btn btn-danger" id="btn_delete_${
      categories[i]._id
    }"><i class="fa fa-trash"></i></button></td>
    </tr>`;
  }
  categoriesTable.innerHTML = html;

  for (i = 0; i < categories.length; i++) {
    document
      .getElementById(`btn_delete_${categories[i]._id}`)
      .addEventListener("click", onCategoryDeleteBtnClicked);
  }
}

function onRefreshCategoriesBtnClicked(e) {
  getAllCategories();
}

function onAddCategoryBtnClicked(e) {
  let html = "";
  html += `<div class="form-group">
          <label for="cname">Category Name</label>
          <input type="text" class="form-control" name="n", id="cname" placeholder="Science fiction">
          </div>`;
  document.getElementById("form_inputs").innerHTML = html;
  openCreateForm();
}

function onCategoryDeleteBtnClicked(e) {
  let category_id = this.id.replace("btn_delete_", "");
  axios
    .delete(BASE_URL + "/categories/data/" + category_id)
    .then(function (response) {
      if (response.status == 200) {
        getAllCategories();
      }
    })
    .catch(function (error) {
      console.log("error:", error);
    });
}

getAllCategories();

addCategoryBtn.addEventListener("click", onAddCategoryBtnClicked);
refreshCategoriesBtn.addEventListener("click", onRefreshCategoriesBtnClicked);
