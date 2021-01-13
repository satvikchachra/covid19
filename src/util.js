export const sortData = data => {
    const temp = [...data];

    temp.sort((a, b) => {
        if(a.cases > b.cases) return -1;
        else if (a.cases === b.cases) return 0;
        else return 1;
    });

    return temp;
}