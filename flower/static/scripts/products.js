const titles = document.querySelectorAll(".bar-name");
titles.forEach((item)=>{
    item.addEventListener('click', ()=>{
        const ul = document.querySelector(`.${item.id}`);
        ul.style.display = (ul.style.display === "block") ? "none" : "block";
    })
})

let params = new URLSearchParams(document.location.search);
let category = params.get("category");
console.log(category);
cat_arr.forEach((item)=>{
    if(item.name === category){
        document.getElementById("category-list").innerHTML+=`
                            <li id="${item.name}" class="categories chosen">
                            ${item.name} →
                        </li>`;
    }
    else{
        document.getElementById("category-list").innerHTML+=`
                            <li id="${item.name}" class="categories">
                            ${item.name} →
                        </li>`;
    }
})
