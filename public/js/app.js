$.ajax({
    url: '/formsubmission',
    type: 'GET'
  })
.then(contacts => {
    contacts.forEach(contact => {
        $('ul').append(`<li class="list-group-item">${contact.name} and your email is ${contact.email}</li>`)
    })
})
