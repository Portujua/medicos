(function(){
	var Paciente = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, RESTService)
	{		
		$scope.safeApply = function(fn) {
		    var phase = this.$root.$$phase;
		    if(phase == '$apply' || phase == '$digest') {
		        if(fn && (typeof(fn) === 'function')) {
		          fn();
		        }
		    } else {
		       this.$apply(fn);
		    }
		};

		$scope.editar = $routeParams.cedula;

		$scope.cargar_pacientes = function(){
			RESTService.getPacientes($scope);
		}

		$scope.cargar_paciente = function(cedula){
			$.ajax({
			    url: "api/paciente/" + cedula,
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	var json = $.parseJSON(data);
			        	$scope.paciente = json;
			        })
			    }
			});
		}

		$scope.cargar_lugares = function(){
			RESTService.getLugares($scope);
		}

		$scope.cargar_parroquias = function(){
			RESTService.getParroquias($scope);
		}

		$scope.cargar_tipos_telefonos = function(){
			RESTService.getTiposTelefonos($scope);
		}

		$scope.autocomplete_lugares = function(){
			var availableTags = [];
			var json = $scope.lugares;

			for (var i = 0; i < json.length; i++)
				if (json[i].tipo == "parroquia")
					availableTags.push({
						label: json[i].nombre_completo,
						value: json[i].nombre_completo
					})

			$( "input[name=lugar]" ).autocomplete({
				source: function(request, response) {
			        var results = $.ui.autocomplete.filter(availableTags, request.term);

			        response(results.slice(0, 10));
			    },
				minLength: 4,
				delay: 0,
				select: function(event, ui){
					$scope.safeApply(function(){
						$scope.paciente.lugar = ui.item.value;
					})
				}
			});
		}

		$scope.registrar_paciente = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir a <strong>' + $scope.paciente.nombre + ' ' + $scope.paciente.apellido + '</strong>?',
				confirm: function(){
					var post = $scope.paciente;

					var nac = post.fecha_nacimiento.split('/');
					post.nacimiento = nac[2] + "-" + nac[1] + "-" + nac[0];

					var fn = "agregar_paciente";
					var msg = "Paciente añadida con éxito";

					if ($routeParams.cedula)
					{
						fn = "editar_paciente";
						msg = "Paciente modificada con éxito";
					}

					$http({
						method: 'POST',
						url: "php/run.php?fn=" + fn,
						data: $.param(post),
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).then(function(obj){
						console.log(obj)
						if (obj.data.ok)
						{
							AlertService.showSuccess(obj.data.msg);
					    	$location.path("/pacientes");
					    }
					    else
					    	console.log(obj.data);
					});
				},
				cancel: function(){}
			});
		}

		$scope.cambiar_estado = function(id, estado){
			$http({
				method: 'POST',
				url: "php/run.php?fn=cambiar_estado_paciente",
				data: $.param({pid:id, estado:estado}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(obj){
				console.log(obj)
				if (obj.data.ok)
				{
					AlertService.showSuccess(obj.data.msg);
			    	$scope.cargar_pacientes();
			    	$scope.p_ = null;
			    }
			    else
			    	console.log(obj.data);
			});
		}

		$scope.seleccionar = function(p){
			$scope.p_ = p;
		}

		$scope.anadir_telefono = function(){
			$scope.paciente.telefonos.push({
				tipo: $scope.telefono.tipo,
				tlf: $scope.telefono.tlf
			});

			$scope.telefono = null;
		}

		$scope.eliminar_telefono = function(index){
			var aux = [];

			for (var i = 0; i < $scope.paciente.telefonos.length; i++)
				if (i != index)
					aux.push($scope.paciente.telefonos[i]);

			$scope.paciente.telefonos = aux;
		}

		if ($routeParams.cedula)
		{
			$scope.cargar_paciente($routeParams.cedula);
		}
	};

	angular.module("adminapp").controller("Paciente", Paciente);
}());