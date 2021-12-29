addForm = document.forms[0]
updateForm = document.forms[1]

function check(form){
    let id = form.elements['category_id'].value
    form.elements['podcategory_id'].childNodes.forEach(el => {
        if(el.dataset.category == id){
            el.hidden = false
        }else{
            el.hidden = true
        }
    })
}

check(addForm)
addForm.elements['category_id'].addEventListener('input', (e)=>{
    check(addForm)
})
check(updateForm)
updateForm.elements['category_id'].addEventListener('input', (e)=>{
    check(updateForm)
})
