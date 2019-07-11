
$('#testButton').click(() => {
    $.ajax({
        method: 'POST',
        url: '/testJquery',
        data: {
            connectionCheck: 'test String'
        },
        dataType: 'json',
        success: (response) => {
            console.log(`response: ${response}`)
            $('#container').append(`<h3> ${response.result}</h3>`)

        },
        error: (error) => {
            console.log(error)
        }
    })
})