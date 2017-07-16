/**
 * @author [huanghui]
 * @Date 2017-7-15 23:43:24
 * Last Modified by: huanghui
 * Last Modified time: 2017-7-15 23:43:24
 */
(function(root, factory){
	root.Vue = factory()
})(this, function(){
	// 默认配置
	var _DEFAULT_ = {
		el: 'body',
		data: {}
	}
	var Vue = function(options) {
		this.extend(this, _DEFAULT_, options); // 对象值的覆盖
		this.observer();

		this.el = document.querySelector(this.el);
		var elements = this.el.querySelectorAll('[v-model]');
		var data = this.data;
		for(var i = 0; i < elements.length; i++){
			elements[i].oninput = function() {
				data[this.getAttribute('v-model')] = this.value;
			}
		}
	}

	Vue.prototype = {
		extend: function(){
			for(var i = 0; i < arguments.length; i++){
				for(var name in arguments[i]){
					this[name] = arguments[i][name];
				}
			}
		},
		observer: function(){
			for(let key in this.data){
				Object.defineProperty(this.data, key, {
					get: function(){
						return this.value;
					},
					set: function(data){
						var model = app.querySelectorAll('[v-model='+ key +']');
						for(var i = 0; i < model.length; i++){
							model[i].value = data;
							model[i].innerHTML = data;
						}
						this.value = data;
					}
				})
			}
		}
	}
	return Vue;
})