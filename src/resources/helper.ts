export const MHelper = {
    /**
     * Lấy giá trị năm hiện tại
     * @return giá trị năm hiện tại
     * author: NXHinh (24/08/2023)
     */
    getCurrentYear() {
        return new Date().getFullYear();
    },
    /**
     * Lấy giá trị năm từ ngày
     * @return giá trị năm hiện tại
     * author: NXHinh (24/08/2023)
     */
    getYear(date: Date) {
        return new Date(date).getFullYear();
    },
    /**
     * Lấy giá trị ngày giờ hiện tại
     * @return Date: giá trị ngày giờ hiện tại
     * author: NXHinh (18/09/2023)
     */
    getCurrentDate() {
        return new Date();
    },
    /**
     * Lấy giá trị ngày giờ hiện tại đã format
     * @return Date: giá trị ngày giờ hiện tại
     * author: NXHinh (18/09/2023)
     */
    getFormatCurrentDate() {
        return this.formatDate(new Date().toDateString());
    },
    
    /**
     * Format date vè yyyy/mm/dd
     * @return string
     * author: NXHinh (18/09/2023)
     */
    formatDate(d: string) {
        let date = new Date(d);
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        
        return [day, month, year].join('-');
    },
    /**
     * Format số về dạng 1,234
     * @return string: Số sau format
     * author: NXHinh (18/09/2023)
     */
    formatNumber(num: number){
        if (num)
            return num.toLocaleString('vi-VN');
        else return "0";
    },
    /**
     * Kiểm tra số
     * @return string: Số sau format
     * author: NXHinh (18/09/2023)
     */
    checkIsNumber(str: string){
        return !isNaN(parseFloat(str))
    },
    /**
     * Tạo guid mới
     * @return string: Số sau format
     * author: NXHinh (28/09/2023)
     */
    newGuid () {
        return crypto.randomUUID();
    },
    /**
     * debounce funtion
     * @return string: Số sau format
     * author: NXHinh (28/09/2023)
     */
    debounce<F extends (...args: any) => any>(
        func: F,
        waitFor: number,
      ){
        let timeout: number = 0
      
        const debounced = (...args: any) => {
          clearTimeout(timeout)
          timeout = setTimeout(() => func(...args), waitFor)
        }
      
        return debounced as (...args: Parameters<F>) => ReturnType<F>
      }
}