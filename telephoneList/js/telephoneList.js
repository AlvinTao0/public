window.onload =function(){
		// ~~~~~~~~~~~~~控制container容器的高度
		var container = document.querySelector(".container")
		container.style.height = document.documentElement.clientHeight+"px"


		// ~~~~~~~~~~~~~面向对象思想，创建联系人数组:listArr,构建联系人函数:list
		var listArr = [{
			name:"张三",
			tele:"18900000000"
		},
		{
			name:"张三1",
			tele:"18911111111"
		},
		{
			name:"张三2",
			tele:"18922222222"
		},
		{
			name:"张三3",
			tele:"18933333333"
		},
		{
			name:"张三4",
			tele:"18944444444"
		},
		{
			name:"张三5",
			tele:"18955555555"
		},
		{
			name:"张三6",
			tele:"18966666666"
		},
		{
			name:"张三7",
			tele:"18977777777"
		},
		{
			name:"张三8",
			tele:"18988888888"
		},
		{
			name:"张三9",
			tele:"18999999999"
		},
		{
			name:"张三10",
			tele:"18910101010"
		},
		{
			name:"张三11",
			tele:"18911110000"
		},
		{
			name:"张三12",
			tele:"18911112222"
		}]

		function list(name){
			this.list = name
		}

		list.prototype = {
			//增加
			add:function(obj){
				this.list.push(obj)
			},
			// 删除
			remove:function(name){
				var length = this.list.length

				for (var i = 0; i < length; i++) {
					if(this.list[i].name == name){
						this.list.splice(i,1)
						console.log(this.list)
						return
					}
				}				
			},
			// 修改
			modify:function(name,obj){
				var length = this.list.length

				for (var i = 0; i < length; i++) {
					if(this.list[i].name == name){
						this.list.splice(i,1,obj)
						console.log(this.list)
						return
					}
				}
			},
			// 查找
			search:function(val){
				var length = this.list.length
				var has = false
				for (var i = 0; i < length; i++) {
					if(this.list[i].name == val || this.list[i].tele == val){
						has = true	
						return i				
					}
				}
				if(has == false){
					alert("查无此人")
				}
			}
		}		

		// ~~~~~~~~~~~~~~dom 把联系人显示到页面中
		var wrap = document.querySelector(".wrap")
			// 呈现通讯录页面,init函数把listArr对象呈现到页面中,后面每当对象listAee更新后,都会运行一次init(listArr),来保持对象和页面的同步更新
		function init(arr){
			wrap.innerHTML = ""
			var length = arr.length
			for (var i = 0; i < length; i++) {
				createOne(arr[i])
			}
			wrap = document.querySelector(".wrap")
			removeMan()
			modifyMan()		
		}
			// 创建单个联系人块（box）
		function createOne(obj){
			var boxDom = document.createElement("div")
			var nameDom = document.createElement("h3")
			var btmDom = document.createElement("div")
			var imgaDom = document.createElement("img")
			var imgbDom = document.createElement("img")
			var teleDom = document.createElement("span")
			
			boxDom.className = "box"
			nameDom.className = "Name"
			btmDom.className = "btm"
			imgaDom.src = "images/QQ20160524-2.png"
			imgaDom.className = "modify"
			imgbDom.src = "images/QQ20160524-3.png"
			imgbDom.className = "remove"
			teleDom.className = "tele"

			nameDom.innerHTML = obj.name
			teleDom.innerHTML = obj.tele

			btmDom.appendChild(imgaDom)
			btmDom.appendChild(imgbDom)
			btmDom.appendChild(teleDom)
			boxDom.appendChild(nameDom)
			boxDom.appendChild(btmDom)
			wrap.appendChild(boxDom)
		}
		init(listArr) // 首先运行一次init(listArr)


		//~~~~~~~~~~~~~点击添加按钮，增加新联系人
		var add = document.querySelector(".add")
		var addman = document.querySelector(".addman")
		var addSure = document.querySelector(".add-sure")
		var Name = document.getElementById("Name")
		var Telephone = document.getElementById("telephone")
			// 点击+ 号按钮后,弹出新建联系人输入框
		add.onclick = function(){
			searchman.style.display = "none"
			addman.style.display = "block"
		}
			// 输入联系人信息,点击确认按钮,将新联系人添加到对象和页面中
		addSure.onclick = function(){
			if(Name.value == "" || Telephone.value == ""){
				alert("输入的联系人信息不完整，未添加新的联系人")				
				Name.value = ""
				Telephone.value = ""
				searchman.style.display = "block"
				addman.style.display = "none"
				return;
			}
			searchman.style.display = "block"
			addman.style.display = "none"
			var man = new list(listArr)
			man.add({
				name:Name.value,
				tele:Telephone.value
			})
			init(listArr) // 对象listArr更新后,呈现到页面中
			Name.value = ""
			Telephone.value = ""
		}


		// ~~~~~~~~~~~~~点击删除按钮，删除联系人
		function removeMan(){
			var removes = wrap.querySelectorAll(".remove")
			for (var i = 0; i < removes.length; i++) {
				removes[i].index = i
				removes[i].onclick = function(){
					var removeName = listArr[this.index].name
					var man = new list(listArr)
					man.remove(removeName)
					init(listArr) // 对象listArr更新后,呈现到页面中
				}
			}
		}
		removeMan()


		// ~~~~~~~~~点击修改按钮，修改联系人信息	
		function modifyMan(){
			var modifys = wrap.querySelectorAll(".modify")
			var modifyman = document.querySelector(".modifyman")
			var Name2 = document.getElementById("Name2")
			var Telephone2 = document.getElementById("telephone2")
			var modifySure = document.querySelector(".modify-sure")
			for (var i = 0; i < modifys.length; i++) {
				modifys[i].index = i
				var beforeModifyName = null;
				modifys[i].onclick = function(){
					container.scrollTop = "0px"
					searchman.style.display = "none"
					modifyman.style.display = "block"
					Name2.value = listArr[this.index].name
					beforeModifyName = listArr[this.index].name
				}
			}
			modifySure.onclick = function(){
				if(Telephone2.value == "" || Name2.value == ""){
					alert("修改信息不完整，未进行修改")
					modifyman.style.display = "none"
					searchman.style.display = "block"
					Name2.value = ""
					Telephone2.value = ""
					return 
				}				
				modifyman.style.display = "none"
				searchman.style.display = "block"
				var man = new list(listArr)
				man.modify(beforeModifyName,{
					name:Name2.value,
					tele:Telephone2.value
				})
				init(listArr)
				Name2.value = ""
				Telephone2.value = ""
			}
		}
		modifyMan()


		// ~~~~~~~~~~点击查找按钮,查找联系人
		var searchman = document.querySelector(".searchman")
		var searchSure = document.querySelector(".search-sure")
		var Name3 = document.getElementById("Name3")
			// 查找联系人是否存在,如果存在,则自动转到联系人的位置,并有绿色背景突出显示
		searchSure.onclick = function(){
			var boxes = wrap.querySelectorAll(".box")
			var man = new list(listArr)
			var number = man.search(Name3.value)
			for (var i = 0; i < boxes.length; i++) {
				boxes[i].className = "box"
			}
			if(number<boxes.length){
				boxes[number].className = "box active"
				container.scrollTop = 75*number+90
			}
		}
			// 当光标重新聚焦到输入框后,上次查找的联系人绿色背景消失
		Name3.onfocus = function(){
			var boxes = wrap.querySelectorAll(".box")
			for (var i = 0; i < boxes.length; i++) {
				boxes[i].className = "box"
			}
		}
	}