export class Pagination {
    page = 1;
    recordPerPage = 20;
    totalRecords = 0;

    recordPerPageList = [
        {label: 20,},
        {label: 50,},
        {label: 100,},
        {label: 200,},
        {label: 500,},
    ];

    setTotalRecords(totalRecords: number) {
        this.totalRecords = totalRecords
    }

    prevPage() {
        this.page -= 1;
        if (this.page < 1) this.page = 1;
    }

    nextPage() {
        this.page += 1;
        var maxPage = Math.ceil(this.totalRecords / this.recordPerPage)
        if (this.page > maxPage) this.page = maxPage
    }
}

export default Pagination;