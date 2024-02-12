function domReady(fn) { 
    if ( 
        document.readyState === "complete" || 
        document.readyState === "interactive"
    ) { 
        setTimeout(fn, 1000); 
    } else { 
        document.addEventListener("DOMContentLoaded", fn); 
    } 
} 

let data = "";
domReady(function () { 
  
    // If found you qr code 
    function onScanSuccess(decodeText, decodeResult) { 
        // alert("You Qr is : " + decodeText, decodeResult);
        data = decodeText;
        createTable();
    } 
  
    let htmlscanner = new Html5QrcodeScanner( 
        "my-qr-reader", 
        { fps: 10, qrbos: 250 } 
    ); 
    htmlscanner.render(onScanSuccess); 
});

function parseText() {
    // Separate the text in data which is separated by a | for example "1|2|3" would mean match one, two cubes, 3 cones
    const splitData = data.split("|");
    // return the array
    return splitData;
}

function createTable() {
    // Redo with for loops
    // Create .env file to store API link
    // sketchy af rn
    document.getElementById("myTable").innerHTML = `
    <table style="font-family: arial, sans-serif; border-collapse: collapse; width: 100%;">
        <tr>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Team Number</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Match Number</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">In Our Alliance</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Where in Community</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Start with Note</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Left Community</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Notes in Speaker</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Notes in Amp</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Total Score</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Ranking</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Work with out Team</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Comments</th>
        </tr>
        <tr>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">`+ parseText()[0]+ `</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">`+ parseText()[1]+ `</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">`+ parseText()[2]+ `</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">`+ parseText()[3]+ `</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">`+ parseText()[4]+ `</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">`+ parseText()[5]+ `</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">`+ parseText()[6]+ `</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">`+ parseText()[7]+ `</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">`+ parseText()[8]+ `</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">`+ parseText()[9]+ `</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">`+ parseText()[10]+ `</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">`+ parseText()[11]+ `</td>


        </tr>
    </table>

    <form method="POST" action="https://script.google.com/macros/s/AKfycbyuop7CV1OKZhyZ-m1nqhgLdCMDOwluWWRIsVWVCMKKqxSE4YdOq8pYmuqC0efHHzkwPw/exec">
        <input type="hidden" name="Team Number" value="`+ parseText()[0]+ `">
        <input type="hidden" name="Match Number" value="`+ parseText()[1]+ `">
        <input type="hidden" name="In Our Alliance" value="`+ parseText()[2]+ `">
        <input type="hidden" name="Where in Community" value="`+ parseText()[3]+ `">
        <input type="hidden" name="Start with Note="`+ parseText()[4]+ `">
        <input type="hidden" name="Left Community" value="`+ parseText()[5]+ `">
        <input type="hidden" name="Notes in Speaker" value="`+ parseText()[6]+ `">
        <input type="hidden" name="Notes in Amp" value="`+ parseText()[7]+ `">
        <input type="hidden" name="Total Score" value="`+ parseText()[8]+ `">
        <input type="hidden" name="Ranking" value="`+ parseText()[9]+ `">
        <input type="hidden" name="Work with out Team" value="`+ parseText()[10]+ `">
        <input type="hidden" name="Comments" value="`+ parseText()[11]+ `">


        <button type="submit">Send to Spreadsheet</button>
    </form>
  `;
}