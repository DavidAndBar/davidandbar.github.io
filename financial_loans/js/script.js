/* CALCULATE CONSTS */

var interest_value_gross;
var compound_type ;
var present_value ;
var loan_time ;
var payments_period ;
var run_no = 0;
var installment_no = 0;
var initial_total_interest;
var max_pay ;

const COMPOUND = ["Yearly", 
             "Monthly", 
             //"Daily",
             ]
const PAYMENT_TYPES = [
    "Yearly",
    "Monthly",
    "2 times a month",
    "Bi-weekly",
    "Weekly",
]

const TIME_CONVERSION = {
        "Weekly": 52,
        "Bi-weekly": 26,
        "2 times a month": 24,
        "Monthly": 12,
        "Yearly": 1,
    }

const colors = {
    capital: "#123524",
    interest: "#04AA6D"
}

const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });

var balances = []

var installments = 0;

var additional_payments = {};

for (let i = 0; i < COMPOUND.length; i++) {
    document.getElementById("compound_type").innerHTML += `<option value="${COMPOUND[i]}">${COMPOUND[i]}</option>`
}

for (let i = 0; i < PAYMENT_TYPES.length; i++) {
    document.getElementById("payments_period").innerHTML += 
    `<option value="${PAYMENT_TYPES[i]}" ${PAYMENT_TYPES[i] === "Monthly"? "selected": ""}>${PAYMENT_TYPES[i]}</option>`
}


const calc_next_pay = (periodic_payment, amt_owed, interest_value) => {
    let interest = Math.round(amt_owed*interest_value*100)/100;
    let capital = periodic_payment - interest
    final_balance = amt_owed - Math.round(capital*100)/100
    return [final_balance, capital, interest] 
}

const add_row = (id, installment_no, amt_owed, periodic_payment, interest, capital, final_balance ) => {
    document.getElementById(id).innerHTML += `<tr class="result">
        <td> ${installment_no} </td>
        <td class="money"> ${Math.round(amt_owed*100)/100} </td>
        <td class="money"> ${Math.round(100*interest)/100} </td>
        <td class="money"> ${Math.round(100*periodic_payment)/100} </td>
        <td class="money"> ${Math.round(100*capital)/100} </td>
        <td class="money"> ${Math.round(100*final_balance)/100} </td>         
        </tr>`
}

const format_values = () => {
        // Get all elements inside the section
        document.querySelectorAll(".money").forEach(el => {
            let value = parseFloat(el.textContent); // convert text to number
            if (!isNaN(value)) {
                el.textContent = formatter.format(value);
            } 

            if (el.tagName == "INPUT" && isFinite(el.value)) {
                el.value = formatter.format(el.value)
            }
        }); 
    }

const del_result = (id) => {
    document.getElementById(id).innerHTML = ``
}

const gen_amortization_table = (run_no) => {
    let show_table = ``;
    if (run_no == 2) {
        document.getElementById("table-1").classList.forEach(el => {
            if (el === 'selected') {
                show_table += 'style="display: none"';
            }
        })
    }
    
    document.getElementById("results-amortization").innerHTML += `
    <table id="table-amortization-${run_no}" ${show_table}>
        <tbody id="amortization-${run_no}">
            <tr id="head-table">
                <th>
                    
                </th>
                <th>
                    Starting Balance
                </th>
                <th>
                    Interest generated
                </th>
                <th>
                    Total paid 
                </th>
                <th>
                    Capital paid
                </th>
                <th>
                    Final balance
                </th>
            </tr>
        </tbody>
    </table>`

    
}

const amortization_graph = (capital_per, run_no) => {
    let degrees = Math.round(capital_per*360/1000)*10;

    document.getElementById(`amortization-graph-${run_no}`).style.background = `conic-gradient(
                                                            ${colors.capital} 0deg ${degrees}deg, 
                                                            ${colors.interest} ${degrees}deg 360deg
                                                            )`

    return capital_per;

}

const show_summary_table = (periodic_payment, interest_paid, capital, run_no) => {
    let summary = document.getElementById("results-amortization-summary");
    let capital_per = Math.round(capital*100/(capital + interest_paid));

    let sum_additional_payments = 0;
    let add_lines = ``

    if (Object.keys(additional_payments).length != 0){
        for(let i=0; i<Object.keys(additional_payments).length; i++){
            if (additional_payments[i] != 0) {
                sum_additional_payments += parseFloat(additional_payments[i]);
                add_lines+=`<p class="summary-par">On period ${i}, ${formatter.format(additional_payments[i])} </p>`
            }
        }
    }

    let summary_content = `<h2>Summary #${run_no}</h2>
                                <div class="summary-half">
                                    <p class="summary-par">Monthly payment: ${formatter.format(periodic_payment)}</p>
                                    <p class="summary-par">Total Interest Paid: ${formatter.format(interest_paid)}</p>
                                    ${run_no == 2 ? 
                                        `<p class="summary-par">Interest difference: ${formatter.format(initial_total_interest-interest_paid)}</p>` 
                                        : ``}
                                    <p class="summary-par">Total Paid: ${formatter.format(interest_paid + capital)}</p>
                                    <p class="summary-par">Additional payments: </p>
                                    ${add_lines}
                                    <p class="summary-par">Total Additional Payments: ${formatter.format(sum_additional_payments)}</p>
                                </div>
                                <div id="graph-summary" class="summary-half">
                                    <p><span class="pie-legend" style="background: ${colors.capital};"></span> Capital: ${capital_per} %</p>
                                    <p><span class="pie-legend" style="background: ${colors.interest};"></span> Interests: ${100-capital_per} %</p>
                                    <div id="amortization-graph-${run_no}" class="amortization-graph"></div>
                                </div>`

    if (run_no == 2 && document.getElementById("summary-run-2")) {
            document.getElementById("summary-run-2").innerHTML = summary_content;
    } else {
        summary.innerHTML += `<div id="summary-run-${run_no}" class="summary">
                                ${summary_content}
                            </div>
                            `
    }
    

    amortization_graph(capital_per, run_no);
    
    // Formats currency numbers
    format_values();
}

const calculate_amortization = (interest_value_gross, compound_type, present_value, loan_time, payments_period, add_pay, run_no) => {

    let interest_paid = 0;
    
    balances = [present_value]
    
    installment_no = 0

    let amt_owed = present_value


    installments = TIME_CONVERSION[payments_period]*loan_time;
    
    interest_value_yearly = compound_type === "Monthly" ? interest_value_gross*12 : interest_value_gross;
    
    interest_value = interest_value_yearly/TIME_CONVERSION[payments_period];

    const periodic_payment_teo = Math.round((present_value*interest_value*((1+interest_value)**installments)/((1+interest_value)**installments-1))*100)/100

    // Deletes previous results if it's a second run
    
    if (run_no == 2 && document.getElementById(`table-amortization-${run_no}`)){
        document.getElementById(`table-amortization-${run_no}`).remove();
    }
    

    //Generates the table headers
    gen_amortization_table(run_no);

    // Loop to create the table
    while (amt_owed > 0) {
        installment_no++;
        
        let periodic_payment = periodic_payment_teo
        
        if (amt_owed < periodic_payment) {
            periodic_payment = amt_owed*(1+interest_value);
            interest = amt_owed*(interest_value);
            capital = amt_owed;
            final_balance = 0;
            balances.push(final_balance);
            add_row(`amortization-${run_no}`, installment_no, amt_owed, periodic_payment, interest, capital, final_balance )
            interest_paid += interest;
            break;
        } else {
            
            
            if (Object.keys(add_pay).length != 0) {
                periodic_payment += add_pay[installment_no];
            }
            
            [final_balance, capital, interest] = calc_next_pay(periodic_payment , amt_owed, interest_value)
            balances.push(final_balance);
            
            add_row(`amortization-${run_no}`, installment_no, amt_owed, periodic_payment, interest, capital, final_balance )
        }
        
        interest_paid += interest;

        amt_owed = final_balance;
        
        
    }

    // Once results revealed, show the button to add additional payment
    document.getElementById("additional-payment-btn").style.display = 'block';

    // Show reset, hide calculate button
    document.getElementById("reset").style.display = "block";
    document.getElementById("calculate").style.display = "none"

    // Disable form
    document.querySelectorAll("#menu-amortization input, #menu-amortization select").forEach(el => {
        el.disabled = true;
    })
    return [installment_no, periodic_payment_teo, interest_paid];
}

const clear_warnings = () => {
    document.querySelectorAll(".warning-pop").forEach((el) => {
            el.style.display = "none"
        })
}

const add_payments_options = (installment_no)=>{
    document.querySelector("#add-new-payment div").style.display = "block";
    
    document.getElementById("select-add-pay-time").innerHTML = ``

    for (let i = 1; i < installment_no; i++) {
        document.getElementById("select-add-pay-time").innerHTML += `<option value="${i}">Between ${i} and ${i+1} payment</option>`
    }

    show_max_payment();
}


const show_max_payment = ()=>{
    let e = document.getElementById("select-add-pay-time").value;
    document.getElementById("max-pay").innerHTML = `${formatter.format(balances[e])}`
    max_pay = parseFloat(balances[e]);
} 

const delete_add_payment = (e, amount)=>{

    document.getElementById(`add-payments-interactive`).innerHTML = ``;
    
    let add_pay_to_delete = e.id.slice(8);

    additional_payments[add_pay_to_delete] -= amount;
    
    for (let i = 0; i < Object.keys(additional_payments).length ; i++) {
        if(additional_payments[i] != 0){
            console.log("for");
            recalculate();
            update_additional_payments();
            return 0;
        }
    }

    additional_payments = {};

    document.getElementById("table-2").style.display = "none"
    document.getElementById("table-all").style.display = "none"
    
    select(document.getElementById(`table-1`), 1);
    recalculate();
    update_additional_payments();
}

const recalculate = () => {
    
    // Calculate new amortization table and returns how many installments are after make the additional payment, and variables to calculate summary
    let [installment_no, periodic_payment_teo, interest_paid] = calculate_amortization(interest_value_gross, compound_type, present_value, loan_time, payments_period, additional_payments, 2)
    
    // Show summary table 
    
    show_summary_table(periodic_payment_teo, interest_paid, present_value, 2);
    // Updates the selector for the new additional payment
    add_payments_options(installment_no);
}

const update_additional_payments = () => {
    // Show additional payments (interactive)
    console.log(additional_payments);
    if(Object.keys(additional_payments).length != 0){
        document.getElementById("add-payments-interactive").style.display = "block"
    } else {
        document.getElementById("add-payments-interactive").style.display = "none"
    }

    let j = 0;
    for (let i = 0; i < Object.keys(additional_payments).length; i++){
        if (additional_payments[i] != 0) {
            document.querySelector("#add-payments-interactive").innerHTML += `<p id="sum-pay-${i}"> Additional Payment #${j+1}. Within Installment# ${i}, amount: ${formatter.format(additional_payments[i])} <button id='payment-${i}' type="button" onclick="delete_add_payment(this, ${additional_payments[i]})" class="delete-additional-payment">Delete</button></p>`
            j++;
        }
    }
}

const add_add_pay = () => {
    let amount = parseFloat(document.getElementById("input-max-pay").value)
    
    if (Object.keys(additional_payments).length === 0) {
        for (let index = 0; index < installment_no; index++) {
        additional_payments[index] = 0;
        }
    }
    
    

    if(parseFloat(amount) <= max_pay && parseFloat(amount) >= 0){
        // Shows buttons to show tables
        document.getElementById("table-2").style.display = "block"
        document.getElementById("table-all").style.display = "block"
        //Clears the div to recreate the added payments
        document.getElementById("add-payments-interactive").innerHTML = ""; 
        
        // Adds the new additional payment to the tracker
        let time = document.getElementById("select-add-pay-time").value
        additional_payments[time] += amount;

        // Clears the input for add payment and clears warnings
        document.getElementById("input-max-pay").value = ""
        document.getElementById("warning-exceeds-value").style.display="none";

        // Recalculate summary and amortization table
        recalculate();

        update_additional_payments();
    } else {
        document.getElementById("warning-exceeds-value").style.display="block";
    }

}

const filter_number = (num) => {
    
    let filtd_number = "";

    let num_split = num.split("");

    for (let i = 0; i<num_split.length; i++){
        if(!isNaN(num_split[i]) || num_split[i] == "."){
            filtd_number += num_split[i];
        }
    }
    return parseFloat(filtd_number);
}

const select = (e, table) => {
    document.querySelectorAll(".show-button").forEach(el => {
        el.classList.remove('selected')
    })
    
    e.classList.add('selected');

    if (table === 'all') {
        document.getElementById(`table-amortization-1`).style.display = 'table';
        document.getElementById(`table-amortization-2`).style.display = 'table';
    } else if (table==1){
        document.getElementById(`table-amortization-1`).style.display = 'table';
        document.getElementById(`table-amortization-2`).style.display = 'none';
    } if (table==2){
        document.getElementById(`table-amortization-2`).style.display = 'table';
        document.getElementById(`table-amortization-1`).style.display = 'none';
    }
}


//Gives functionallity to the buttons

document.getElementById('calculate').addEventListener('click', function (e) {
    e.preventDefault();
    
    interest_value_gross = filter_number(document.getElementById("interest_value").value)/100;
    compound_type = document.getElementById("compound_type").value;
    present_value = filter_number(document.getElementById("present_value").value);
    loan_time = filter_number(document.getElementById("installments").value);
    payments_period = document.getElementById("payments_period").value;
    
    if (isNaN(present_value) || present_value < 0) {
        clear_warnings();
        document.getElementById("warning-pv").style.display = "block";
    } else if (isNaN(loan_time) || loan_time < 0) {
        clear_warnings();
        document.getElementById("warning-installments").style.display = "block"
    } else if (isNaN(interest_value_gross) || interest_value_gross < 0) {
        clear_warnings();
        document.getElementById("warning-interest").style.display = "block"
    } else {
        document.getElementById("table-1").style.display = "block"
        document.getElementById("interest_value").value = interest_value_gross*100;
        document.getElementById("present_value").value = present_value;
        document.getElementById("installments").value = loan_time;
        clear_warnings();
        let interest_paid;
        [installment_no, periodic_payment_teo, interest_paid] = calculate_amortization(interest_value_gross, compound_type, present_value, loan_time, payments_period, additional_payments, 1)
        // Show summary table 
        show_summary_table(periodic_payment_teo, interest_paid, present_value, 1);
        // Save initial total interest
        initial_total_interest = interest_paid;
    }

});

document.getElementById('reset').addEventListener('click', function (e) {
    clear_warnings();
    this.style.display = "none"
    document.getElementById("additional-payment-btn").style.display = "none";
    document.querySelector("#add-new-payment div").style.display = "none";
    document.querySelectorAll(".show-button").forEach( el => {
        el.style.display = "none";
    })
    
    document.getElementById("calculate").style.display = "block";
    del_result("results-amortization");
    del_result("results-amortization-summary");
    document.querySelector("#add-new-payment div").style.display = "none";
    document.querySelector("#add-payments-interactive").style.display = "none";
    document.getElementById("present_value").value = parseFloat(present_value);
    additional_payments = {};
    run_no = 0;
    // Enable form
    document.querySelectorAll("#menu-amortization input, #menu-amortization select").forEach(el => {
        el.disabled = false;
    })

});

document.getElementById('additional-payment-btn').addEventListener('click', function (e) {
    add_payments_options(installment_no);
});

