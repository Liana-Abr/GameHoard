?
// addForm.addEventListener('submit', async (evt)=>{
//     let res = await fetch('/api/product', {
//         method: 'POST',
//         headers: {
//             name_product:addForm.elements['name_product'].value,
//             izdatel_id:addForm.elements['izdatel_id'].value,
//             date_vypusk_product:`${addForm.elements['date_vypusk_product'].value}-00-00`,
//             category_id:addForm.elements['category_id'].value,
//             podcategory_id:addForm.elements['podcategory_id'].value,
//             min_igrok_product:addForm.elements['min_igrok_product'].value,
//             vozrast_ogranich_product:addForm.elements['vozrast_ogranich_product'].value,
//             opisanie_product:addForm.elements['opisanie_product'].value,
//             price_product:addForm.elements['price_product'].value,
//             vremya_igry_product:addForm.elements['vremya_igry_product'].value,
//             image_product:addForm.elements['image_product'].files[0].name
//         }
//     });
// })
// async function handleFormSubmit(event) {
// 	event.preventDefault();
//     const form = event.currentTarget;
// 	const url = form.action;

// 	try {
// 		const formData = new FormData(form);
// 		const responseData = await postFormDataAsJson({ url, formData });
//         console.log({ responseData });
// 	} catch (error) {
// 		console.error(error);
// 	}
// }
// body = 
// {
//     name_product:addForm.elements['name_product'].value,
//     izdatel_id:addForm.elements['izdatel_id'].value,
//     date_vypusk_product:`${addForm.elements['date_vypusk_product'].value}-00-00`,
//     category_id:addForm.elements['category_id'].value,
//     podcategory_id:addForm.elements['podcategory_id'].value,
//     min_igrok_product:addForm.elements['min_igrok_product'].value,
//     vozrast_ogranich_product:addForm.elements['vozrast_ogranich_product'].value,
//     opisanie_product:addForm.elements['opisanie_product'].value,
//     price_product:addForm.elements['price_product'].value,
//     vremya_igry_product:addForm.elements['vremya_igry_product'].value,
//     image_product:addForm.elements['image_product'].files[0].name
// }
// console.log(body)