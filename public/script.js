$.get('/tasks', (list) => {
    let inpNewTask = $('#inpNewTask')
    let btnAdd = $('#btnAdd')
    let btnClear = $('#btnClear')
    let btnSort = $('#btnSort')
    let btnClean = $('#btnClean')
    let ulTasks = $('#ulTasks')

    let numLineThrough = 0

    function newTask(taskVal) {
        return $(`<li class="list-group-item">${taskVal}</li>`)
            .on('click', function () {
                let thisTask = $(this)
                let checkedVal = thisTask.toggleClass('disabled').hasClass('disabled')
                $.ajax({
                    url: '/tasks',
                    type: 'PUT',
                    data: {checked: checkedVal.toString(), pos: ulTasks.children().index(thisTask)},
                    success: () => {
                        if (checkedVal) {
                            numLineThrough++
                        } else {
                            numLineThrough--
                        }
                        btnSort.prop('disabled', !numLineThrough)
                        btnClean.prop('disabled', !numLineThrough)
                    }
                });
            })
    }

    for (let entry of list) {
        ulTasks.append(newTask(entry.task).toggleClass('disabled', entry.checked === 'true'))
    }

    inpNewTask.on('keypress', (event) => {
        if (event.which === 13 && /\S/.test(inpNewTask.val())) {
            btnAdd.trigger('click')
        }
    })

    inpNewTask.on('input', () => {
        let isValid = /\S/.test(inpNewTask.val())
        btnAdd.prop('disabled', !isValid)
        btnClear.prop('disabled', !isValid)
    })

    btnAdd.on('click', () => {
        let inpNewTaskVal = inpNewTask.val()
        $.post('/tasks', {task: inpNewTaskVal}, () => {
            ulTasks.prepend(newTask(inpNewTaskVal))
            btnClear.trigger('click')
        })
    })

    btnClear.on('click', () => {
        inpNewTask.val('')
        btnAdd.prop('disabled', true)
        btnClear.prop('disabled', true)
    })

    btnSort.on('click', () => {
        ulTasks.append($('#ulTasks > .disabled'))
        $.ajax({
            url: '/tasks',
            type: 'PATCH',
        });
    })

    btnClean.on('click', () => {
        $('#ulTasks > .disabled').remove()
        $.ajax({
            url: '/tasks',
            type: 'DELETE',
        });
    })
})