document.querySelector("#subbtn").addEventListener("click", NationalizeAPI)
async function NationalizeAPI() {
	try {
		var text = document.querySelector('#txt').value
		var tablebody = document.querySelector("#tbody")
		if (text === "") {
			alert("Please Enter Name")
			window.location.reload()
		}
		else {
			var url = new URL("https://api.nationalize.io/");
			url.searchParams.append('name', text);
			let response = await fetch(url)
			let data = await response.json();
			var ul = document.querySelector('#tt')
			var text = document.querySelector('#txt')
			var trlength = 0;
			Object.keys(data).forEach(key => {
				if (key === 'country') {
					data[key].forEach(ele => {
						var tr = document.createElement('tr')
						trlength++
						Object.keys(ele).forEach(Element => {
							var td = document.createElement('td')
							td.innerText = ele[Element]
							tr.append(td)
						})
						tablebody.append(tr)
					})
				}
				else {
					let Name = document.querySelector('#Para')
					Name.innerHTML = 'Name' + " - " + data[key]
				}
				if (trlength > 2) {
					document.getElementById("tab").deleteRow(2);
				}
				document.querySelector('#txt').addEventListener("click", clear)
				function clear() {
					document.querySelector('#Para').innerHTML = ""
					document.getElementById("tab").deleteRow(1)
					document.getElementById("tab").deleteRow(2)
				}
				document.querySelector('#txt').value = ""
			});
			if (trlength == 0) {
				alert("No Records Found");
				document.querySelector('#Para').innerHTML = ""
			}
		}
	}
	catch (err) {
		alert(err)
	}
}
