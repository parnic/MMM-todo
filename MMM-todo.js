Module.register("MMM-todo", {
    defaults: {
        todos: []
    },

    start: function() {
        var self = this
        setTimeout(function() {
            self.dailyUpdate()
        }, self.getTimeToMidnight() - new Date())
    },

    dailyUpdate: function() {
        var self = this
        self.updateDom()
        setTimeout(function() {
            self.dailyUpdate()
        }, 24 * 60 * 60 * 1000)
    },

    getDom: function() {
        var self = this

        var today = new Date()
        var todayStr = self.getDateString(today)

        var yesterday = new Date()
        yesterday.setDate(today.getDate() - 1)
        var yesterdayStr = self.getDateString(yesterday)

        var wrapper = document.createElement("div")
        self.config.todos.forEach(element => {
            var id = element.id
            // this is ugly. do better.
            if (element.isToday) {
                id = id + "_" + todayStr
            } else if (element.isYesterday) {
                id = id + "_" + yesterdayStr
            }

            wrapper.appendChild(self.getCheckbox(element.label, id))
        });

        return wrapper
    },

    getDateString(date) {
        var td = String(date.getDate()).padStart(2, '0')
        var tm = String(date.getMonth() + 1).padStart(2, '0')
        var ty = date.getFullYear()

        return ty + tm + td
    },

    getTimeToMidnight() {
        var timeToMidnight = new Date()
        timeToMidnight.setHours(24, 0, 0, 0)
        return timeToMidnight
    },

    getCheckbox: function(label, id) {
        var container = document.createElement("label")
        container.className = "todo-container"
        container.innerText = label

        var cb = document.createElement("input")
        cb.type = "checkbox"
        if (id !== undefined) {
            cb.id = id
        }
        if (parseInt(localStorage.getItem(cb.id), 10)) {
            cb.checked = true
        }
        cb.onclick = function(ev) {
            localStorage.setItem(ev.target.id, cb.checked ? 1 : 0)
        }

        var cm = document.createElement("span")
        cm.className = "checkmark"

        container.appendChild(cb)
        container.appendChild(cm)

        return container
    },

    getStyles: function() {
        return [this.file("MMM-todo.css")]
    }
})
