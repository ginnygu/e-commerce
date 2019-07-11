$(function () {

    $('#search').keyup(() => {
        let searchText = $('#search').val()
        $.ajax({
            method: 'POST',
            url: '/api/product/instant-search',
            data: {
                search_term: searchText
            },
            dataType: 'json',
            success: (response) => {
                let data = response.hits.hits
                if(data.length === 0 ){
                    $('#productSearchResults').empty()
                    $('#productSearchResults').append('Product you are looking for is not found').addClass('s-flex justify-content-center alert alert alert-warning')
                } else {
                    $('#productSearchResults').empty()
                    $('#productSerachResults').removeClass(' d-flex justify-content-center alert alert-warning')
                    for(let i =0; i < data.length; i++){
                        let html = ''
                        html += '<div class="card">'
                        html += `<a href="/api/product/getproductbyid/${data[i]._id}">`
                        html += `<img class="card-img-top" src="${data[i]._source.image}" alt="Card image cap" /> </a>`
                        html += `<div class="card-body">`
                        html += `<h5 class="card-title">Name: ${data[i]._source.name} </h5>`
                        html += `<p class="card-text">Category: ${data[i]._source.category.name} </p>`
                        html += `<p class="card-text">$ ${data[i]._source.price} </p>`
                        html += `<a href="/api/product/${data[i]._id}" class="btn btn-primary">Shop</a>`
                        html += `</div>`;
                        html += `</div>`;

                        $('#productSearchResults').append(html)
                    }
                }
            },
            error: (error) => {
                console.log(error)
            }
        })
    })
})