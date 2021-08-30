/* ------------------------------------- FUNCION CREADORA DE MODALES----------------------------------------- */

const createModal = (data)=>{
    const fragment = document.createDocumentFragment();

    for (const key in data) {

        let temporalContainer = "";
        let temporalFragment = "";
        switch (typeof data[key]) {
            case "number":
                temporalContainer = document.createElement('DIV')
                temporalFragment = `<label for="${key}">${key}</label>
                                          <input type="text" name="${key}" id="${key}" value="${data[key].toString()}" placeholder="${key}">`
        
                temporalContainer.innerHTML = temporalFragment
                fragment.appendChild(temporalContainer)
                break;
                
            case "boolean":
                temporalContainer = document.createElement('DIV')
                temporalFragment = `<div class="form-div-select">
                                            <div>
                                                <label for="${key}">${key}</label>
                                                <select name="${key}" id="${key}" class="form-select">
                                                    <option selected>${data[key]}</option>
                                                    <option>${!data[key]}</option>
                                                </select>
                                            </div>
                                        </div>`
        
                temporalContainer.innerHTML = temporalFragment
                fragment.appendChild(temporalContainer)
              break;

            default:
              //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
            break;
          }
    }
    return fragment;
}

/* ------------------------------------- Emsanbladora de tablas ----------------------------------------- */

const createTable = (dataInfo)=>{
    const fragment = document.createDocumentFragment();
    
    let limit = 60;
    for (const [index, value] of dataInfo.entries()) {
            let rowTable =  document.createElement('TR')
            let temporalFragment = `<td>${index+1}</td>
                                    <td>${value.identifier}</td>
                                    <td>${value.type}</td>
                                    <td>${value.numberDat}</td>
                                    <td><div class="cell-button"><button id="${value.identifier}" class="modal-button__item dinamic-button" text-transform: none;">Más información</button></div></td>`

            rowTable.innerHTML = temporalFragment
            fragment.appendChild(rowTable)
            limit--;
        if(limit === 0) break
    }
    return fragment;
}

/* ------------------------------------- EMSAMBLADORA DE TABLAS EN MODALES ----------------------------------------- */

const createModalTable = (dataInfo)=>{
    const fragment = document.createDocumentFragment();
    
    if(dataInfo.length === 0) return fragment;
    let table =  document.createElement('TABLE')
    let temporalFragment = `<thead class="border-bottom">
                                <th style="width: 10%">ID</th>
                                <th style="width: 15%">Nombre</th>
                                <th style="width: 15%">Tipo</th>
                                <th style="width: 15%">Cantidad</th>
                                <th style="width: 15%">Padre</th>
                                <th style="width: 100px">Hijos</th>
                            </thead>
                            <tbody>`

    let ella = "dafsgdf"
    for (const [index, value] of dataInfo.entries()) {
        
        temporalFragment += `<tr><td>${index+1}</td>
                                <td>${value.identifier}</td>
                                <td>${value.type}</td>
                                <td>${value.numberDat}</td>
                                <td>${value.parent}</td>
                                <td>${(value.childrens.join().length > 20)
                                    ?value.childrens.join().substring(0,20)+"..."
                                    :value.childrens.join()}</td></tr>`

        
    }
    temporalFragment += `</tbody>
                         </table>`
    table.innerHTML = temporalFragment
    fragment.appendChild(table)
    return fragment;
}

const createExtraTable = (dataString)=>{
    const fragment = document.createDocumentFragment();
    let dataInfo = dataString.split('|')
    /* let limit = 60; */

    for (const value of dataInfo) {
            let rowTable =  document.createElement('TR')
            let temporalFragment = `<td>${value}</td>`

            rowTable.innerHTML = temporalFragment
            fragment.appendChild(rowTable)
            /* limit--;
        if(limit === 0) break */
    }
    return fragment;
}

export const Modal = {
    createModal,
    createTable,
    createModalTable,
    createExtraTable
}
