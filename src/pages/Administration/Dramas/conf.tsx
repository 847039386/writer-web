

let ExpandColumns = [
    { label: '权重', value: 'weight' },
    { label: '创建时间', value: 'create_at' },
]

let defaultExpandColumns = ['weight','create_at'];


const getExpandTitle = (value :string) : string => {
    let title = value
    switch(value){
        case 'create_at' :
            title = '创建时间';
        break;
        case 'weight' :
            title = '权重';
        break;
    }
    return title
}

const setTableColumns = (array :Array<string>, oldTab :Array<any>) => {
    let tabColumns = array.map((expand :string) => {
        let title = getExpandTitle(expand)
        return {
            key :expand , 
            title : title ,
            dataIndex:expand
        }
    })
    let newTab :Array<any> = [];
    newTab.push(oldTab[0])
    newTab = newTab.concat(tabColumns);
    newTab.push(oldTab[oldTab.length - 1])
    return newTab;
    
}



export { ExpandColumns ,defaultExpandColumns ,setTableColumns}