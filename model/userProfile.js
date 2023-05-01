import { DataTypes } from 'sequelize'
import sqlDB from '../database/database.js'

//Tabla usuarios: Estos contaran con un rol para que pueda acceder a las paginas segun los permisos que tenga
export const tb_user = sqlDB.define('tb_user', {
    pk_id_user: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    first_name_user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name_user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email_user: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        },
        unique: true,
        allowNull: false
    },
    password_user: {
        type: DataTypes.STRING
    },

    //Fecha del último inicio de sesion
    last_date_login: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },

    balance_token: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
})

//Tabla de rol usuario
export const tb_rol_user = sqlDB.define('tb_rol_user', {
    pk_id_rol_user: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title_rol_user: {
        type: DataTypes.STRING
    },
    description_rol_user: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

//Tabla de tareas
export const tb_task = sqlDB.define('tb_task', {
    pk_id_task: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title_task: {
        type: DataTypes.STRING
    },
    description_task: {
        type: DataTypes.STRING
    },
    status_task: {
        type: DataTypes.STRING,
        defaultValue: 'open'
    },
    start_date_task: {
        type: DataTypes.DATE
    },
    end_date_task: {
        type: DataTypes.DATE
    },
    priority_task: {
        type: DataTypes.STRING
    },
    development_HH: {
        type: DataTypes.INTEGER
    },
    reward_task: {
        type: DataTypes.INTEGER
    },
    limit_incidents: {
        type: DataTypes.INTEGER
    }
})

//Tabla de incidentes
export const tb_incident = sqlDB.define('tb_incident', {
    pk_id_incident: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title_incident: {
        type: DataTypes.STRING
    },
    description_incident: {
        type: DataTypes.STRING
    },
    start_date_incident: {
        type: DataTypes.DATE
    },
    end_date_incident: {
        type: DataTypes.DATE
    },
    status_incident: {
        type: DataTypes.STRING
    }
})




export const tb_type_incident = sqlDB.define('tb_type_incident', {
    pk_id_type_incident: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title_type_incident: {
        type: DataTypes.STRING
    },
    description_type_incident: {
        type: DataTypes.STRING
    },
    penalty_incident: {
        type: DataTypes.INTEGER
    },
    returned_tokens: {
        type: DataTypes.INTEGER
    }
})

export const tb_refresh_tokens = sqlDB.define('tb_refresh_tokens', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    refresh_token: {
        type: DataTypes.STRING
    }
})

tb_user.hasMany(tb_refresh_tokens, {
    foreignKey: {
        name: 'fk_id_refresh_token',
        allowNull: false
    },
    sourceKey: 'pk_id_user'
})

tb_refresh_tokens.belongsTo(tb_user, {
    foreignKey: {
        name: 'fk_id_refresh_token',
        allowNull: false
    },
    targetId: 'pk_id_user'
})

tb_rol_user.hasMany(tb_user, {
    foreignKey: {
        name: 'fk_id_rol_user',
        allowNull: false
    },
    sourceKey: 'pk_id_rol_user'
});

tb_user.belongsTo(tb_rol_user, {
    foreignKey: {
        name: 'fk_id_rol_user',
        allowNull: false
    },
    targetId: 'pk_id_rol_user'
});

tb_user.hasMany(tb_task, {
    foreignKey: {
        name: 'fk_id_user',
        allowNull: false
    },
    sourceKey: 'pk_id_user'
});

tb_task.belongsTo(tb_user, {
    foreignKey: {
        name: 'fk_id_user',
        allowNull: false
    },
    targetId: 'pk_id_user'
});

tb_task.hasMany(tb_incident, {
    foreignKey: {
        name: 'fk_id_task',
        allowNull: false
    },
    sourceKey: 'pk_id_task'
});

tb_incident.belongsTo(tb_task, {
    foreignKey: {
        name: 'fk_id_task',
        allowNull: false
    },
    targetId: 'pk_id_task'
});

tb_type_incident.hasMany(tb_incident, {
    foreignKey: {
        name: 'fk_id_type_incident',
        allowNull: false
    },
    sourceKey: 'pk_id_type_incident'
});

tb_incident.belongsTo(tb_type_incident, {
    foreignKey: {
        name: 'fk_id_type_incident',
        allowNull: false
    },
    targetId: 'pk_id_type_incident'
});