export class SchemaUser {
    constructor (user,method) {
        this.first_name_user=user.first_name_user
        this.last_name_user=user.last_name_user
        this.email_user=user.email_user
        this.password_user=user.password_user,
        this.last_date_login=user.last_date_login
        this.fk_id_rol_user=method=='POST'?user.fk_id_rol_user:undefined
    }
}

export class SchemaTask {
    constructor (task, method) {
        this.title_task=task.title_task
        this.description_task=task.description_task
        this.status_task=task.status_task
        this.start_date_task=task.start_date_task
        this.end_date_task=task.end_date_task
        this.priority_task=task.priority_task
        this.development_HH=task.development_HH
        this.reward_task=task.reward_task
        this.limit_incidents=task.limit_incidents
        this.fk_id_user=method=='POST'?task.fk_id_user:undefined
    }
}

export class SchemaRolUser {
    constructor (rol) {
        this.title_rol_user=rol.title_rol_user
        this.description_rol_user=rol.description_rol_user
    }
}

export class SchemaIncident {
    constructor (incident,method) {
        this.title_incident=incident.title_incident
        this.description_incident=incident.description_incident
        this.start_date_incident=incident.start_date_incident
        this.end_date_incident=incident.end_date_incident
        this.status_incident=incident.status_incident
        this.fk_id_task=method=='POST'?incident.fk_id_task:undefined
        this.fk_id_type_incident=method=='POST'?incident.fk_id_type_incident:undefined
    }
}

export class SchemaTypeIncident {
    constructor (typeIncident) {
        this.title_type_incident=typeIncident.title_type_incident
        this.description_type_incident=typeIncident.description_type_incident
        this.penalty_incident=typeIncident.penalty_incident
        this.returned_tokens=typeIncident.returned_tokens
    }
}

export class SchemaRefreshToken {
    constructor (token) {
        this.id = token.id
        this.refresh_token = token.refresh_token
    }
}