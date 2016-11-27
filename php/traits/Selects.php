<?php
	trait Selects {        
		public function cargar_lugares($post)
        {
            $query = $this->db->prepare("
                select *
                from Lugar
            ");

            $query->execute();

            return json_encode($query->fetchAll());
        }

        public function cargar_lugar($post)
        {
            $query = $this->db->prepare("
                select *
                from Lugar
                where id=:id
            ");

            $query->execute(array(
                ":id" => $post['lid']
            ));

            return json_encode($query->fetchAll());
        }

        public function cargar_parroquias($post)
        {
            $query = $this->db->prepare("
                select *
                from Lugar
                where tipo='parroquia'
                group by nombre
                order by nombre asc
            ");

            $query->execute();

            return json_encode($query->fetchAll());
        }

        public function cargar_medicos($post, $query_extra = "")
        {
            $query = $this->db->prepare("
                select
                    p.id as id,
                    p.nombre as nombre,
                    p.segundo_nombre as segundo_nombre,
                    p.apellido as apellido,
                    p.segundo_apellido as segundo_apellido,
                    concat(
                        p.nombre, ' ',
                        (case when p.segundo_nombre is not null then concat(p.segundo_nombre, ' ') else '' end),
                        p.apellido,
                        (case when p.segundo_apellido is not null then concat(' ', p.segundo_apellido) else '' end)
                    ) as nombre_completo,
                    p.cedula as cedula,
                    p.tipo_cedula as tipo_cedula,
                    p.email as email,
                    p.usuario as usuario,
                    p.contrasena as contrasena,
                    date_format(p.fecha_nacimiento, '%d/%m/%Y') as fecha_nacimiento, 
                    date_format(p.fecha_creado, '%d/%m/%Y') as fecha_creado,
                    p.sexo as sexo,
                    p.estado_civil as estado_civil,
                    p.estado as estado,
                    (select nombre_completo from Lugar where id=p.lugar) as lugar,
                    p.direccion as direccion
                from Medico as p
                where p.id > 1
                ".$query_extra."
            ");

            $query->execute();
            $medicos = $query->fetchAll();

            for ($i = 0; $i < count($medicos); $i++)
            {
                $medicos[$i]["snombre"] = $medicos[$i]["segundo_nombre"];
                $medicos[$i]["sapellido"] = $medicos[$i]["segundo_apellido"];

                /* Telefonos */
                $query = $this->db->prepare("
                    select 
                        t.tlf as tlf,
                        tt.nombre as tipo
                    from Telefono as t, Telefono_Tipo as tt
                    where t.tipo=tt.id and t.medico=:pid
                ");

                $query->execute(array(
                    ":pid" => $medicos[$i]['id']
                ));

                $medicos[$i]['telefonos'] = $query->fetchAll();
            }

            return json_encode($medicos);
        }

        public function cargar_medico($post)
        {
            $medicos = json_decode($this->cargar_medicos(array(), " and p.cedula='".$post['cedula']."'"));

            return json_encode($medicos[0]);
        }

        public function cargar_tipos_telefonos($post)
        {
            $query = $this->db->prepare("
                select *
                from Telefono_Tipo
            ");

            $query->execute();

            return json_encode($query->fetchAll());
        }

        public function cargar_curso($post)
        {
            $query = $this->db->prepare("
                select *
                from Curso
                where id=:id
            ");

            $query->execute(array(
                ":id" => $post['id']
            ));

            $cursos = $query->fetchAll();

            return json_encode($cursos[0]);
        }
	}
?>