create table Lugar (
	id int not null auto_increment,
	nombre varchar(128),
	nombre_completo varchar(512),
	tipo varchar(64),
	lugar int,
	primary key(id),
	foreign key (lugar) references Lugar(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Medico (
	id int not null auto_increment,
	nombre varchar(32) not null,
	segundo_nombre varchar(32),
	apellido varchar(32) not null,
	segundo_apellido varchar(32),
	tipo_cedula varchar(1),
	cedula varchar(32),
	email varchar(128),
	usuario varchar(32),
	contrasena varchar(32),
	fecha_nacimiento date,
	fecha_creado datetime,
	sexo varchar(10) not null,
	estado_civil varchar(32),
	estado tinyint(1) default 1,
	lugar int not null,
	direccion varchar(256) not null,
	cambiar_contrasena tinyint(1) default 0,
	primary key(id),
	unique(cedula),
	foreign key (lugar) references Lugar(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Telefono_Tipo (
	id int not null auto_increment,
	nombre varchar(128) not null,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Telefono (
	id int not null auto_increment,
	tlf varchar(128) not null,
	tipo int not null,
	medico int,
	paciente int,
	primary key(id),
	foreign key (tipo) references Telefono_Tipo(id),
	foreign key (medico) references Medico(id),
	foreign key (paciente) references Paciente(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Log_Login (
	id int not null auto_increment,
	fecha datetime not null,
	username varchar(32) not null,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Paciente (
	id int not null auto_increment,
	nombre varchar(32) not null,
	segundo_nombre varchar(32),
	apellido varchar(32) not null,
	segundo_apellido varchar(32),
	tipo_cedula varchar(1),
	cedula varchar(32),
	email varchar(128),
	usuario varchar(32),
	contrasena varchar(32),
	fecha_nacimiento date,
	fecha_creado datetime,
	sexo varchar(10) not null,
	estado_civil varchar(32),
	estado tinyint(1) default 1,
	lugar int not null,
	direccion varchar(256) not null,
	cambiar_contrasena tinyint(1) default 0,
	primary key(id),
	unique(cedula),
	foreign key (lugar) references Lugar(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;