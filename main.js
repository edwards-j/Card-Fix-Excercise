// If you drag one of the cards into the top/bottom box, and then drag another card into the first one, you get a nested card. You need to prevent this from happening.

// The user should only be able to drag one card into either box. Use the childNodes property to ensure that, if a card is already in the box, another can't be added.

// The user should be able to move a card from the top/bottom box back to the middle.



const DragDropManager = Object.create(null, {
    init: {
        value: () => {
            const stages = document.querySelectorAll(".stage")

            stages.forEach(stage => {
                // Gain reference of item being dragged
                stage.ondragstart = e => {
                    e.dataTransfer.setData("text", e.target.classList)
                }
            })


            const targets = document.querySelectorAll(".target")

            targets.forEach(target => {
                // Dragover not supported by default. Turn that off.
                target.ondragover = e => e.preventDefault()

                target.ondrop = e => {
                    // Enabled dropping on targets
                    e.preventDefault()

                    // Determine what's being dropped
                    const data = e.dataTransfer.getData("text")

                    // Append card to target component as child, but only if there are no cards currently in there
                    if (e.target.hasChildNodes() !== true) {
                        e.target.appendChild(document.querySelector(`.${data.split(" ")[1]}`))
                    } else {
                        alert("You can't put that there")
                    }
                }

            })

            const origin = document.querySelectorAll(".origin")

            origin.forEach(target => {
                // Dragover not supported by default. Turn that off.
                target.ondragover = e => e.preventDefault()
                
                target.ondrop = e => {
                    // Enabled dropping on targets
                    e.preventDefault()

                    // Determine what's being dropped
                    const data = e.dataTransfer.getData("text")

                    e.target.insertAdjacentElement('beforebegin' , document.querySelector(`.${data.split(" ")[1]}`))
                }

            })
        }
    }
})

DragDropManager.init()
