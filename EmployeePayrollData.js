class EmployeePayrollData {
    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if (nameRegex.test(name))
            this._name = name;
        else throw 'Name is Incorrect!';
    }

    get profilePic() {
        return this._profilePic;
    }

    set profilePic(profilePic) {
        this._profilePic = profilePic;
    }

    get gender() {
        return this._gender;
    }

    set gender(gender) {
        this._gender = gender;
    }

    get department() {
        return this._department;
    }

    set department(department) {
        this._department = department;
    }

    get salary() {
        return this._salary;
    }

    set salary(salary) {
        this._salary = salary;
    }

    get note() {
        return this._note;
    }

    set note(note) {
        this._note = note;
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(startDate) {
        this._startDate = startDate;
    }

    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const empDate = !this.startDate ? "undefined" :
            this.startDate.toLocaleDateString("en-US", options);

        return "id=" + this.id + ", name='" + this.name + ", gender='" + this.gender +
            ", profilePic='" + this.profilePic + ", department=" + this.department +
            ", salary=" + this.salary + ", startDate=" + empDate + ", note=" + this.note;
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');

    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const save = () => {
        try {
            let employeePayrollData = createEmployeePayroll();
            createAndUpdateStorage(employeePayrollData);
            alert("Data Saved");
            console.log(employeePayrollData);
        } catch (e) {
            return;
        }
    };

    const createAndUpdateStorage = (employeePayrollData) => {
        let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList")) || [];
        employeePayrollList.push(employeePayrollData);
        localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    };

    const createEmployeePayroll = () => {
        let employeePayrollData = new EmployeePayrollData();
        try {
            employeePayrollData.name = getInputValueByID('#name');
            employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
            employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
            employeePayrollData.department = getSelectedValues('[name=department]').pop();
            employeePayrollData.salary = getInputValueByID('#salary');
            employeePayrollData.note = getInputValueByID('#notes');
            employeePayrollData.startDate = getInputValueByID('#year') + "-" + getInputValueByID('#month') + "-" +
            getInputValueByID('#day');
            return employeePayrollData;
        } catch (e) {
            setTextValue('.text-error', e);
            throw e;
        }
    };

    const getSelectedValues = (propertyValue) => {
        let allItems = document.querySelectorAll(propertyValue);
        let selItems = [];
        allItems.forEach(item => {
            if (item.checked) selItems.push(item.value);
        });
        return selItems;
    };

    const getInputValueByID = (id) => {
        let value = document.querySelector(id).value;
        return value;
    };

    const setTextValue = (id, value) => {
        const element = document.querySelector(id);
        element.textContent = value;
    };

    document.querySelector('#submitButton').addEventListener('click', save);
});