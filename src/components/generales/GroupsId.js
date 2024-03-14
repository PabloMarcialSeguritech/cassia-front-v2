const servidores_id={
        18: "SERVIDORES - GEMYC",
        19: "SERVIDORES - BOTONES",
        17: "SERVIDORES - CAD",
        10: "SERVIDORES - GENETEC",
}




const roles={
        "message": "success",
        "success": true,
        "data": [
          {
            "rol_id": 1,
            "name": "admin",
            "created_at": "NaT",
            "permissions": [
              {
                "permission_id": 1,
                "module_name": "filters",
                "name": "read"
              },
              {
                "permission_id": 2,
                "module_name": "filters",
                "name": "write"
              }
            ],
            "id": 1
          },
          {
            "rol_id": 2,
            "name": "prueba",
            "created_at": "NaT",
            "permissions": [
              {
                "permission_id": 1,
                "module_name": "filters",
                "name": "read"
              }
            ],
            "id": 2
          },
          {
            "rol_id": 5,
            "name": "Admin",
            "created_at": "2023-08-24T17:26:07",
            "permissions": [
              {
                "permission_id": 1,
                "module_name": "filters",
                "name": "read"
              }
            ],
            "id": 5
          },
          {
            "rol_id": 6,
            "name": "Admin",
            "created_at": "2023-08-24T17:26:29",
            "permissions": [
              {
                "permission_id": 1,
                "module_name": "filters",
                "name": "read"
              }
            ],
            "id": 6
          },
          {
            "rol_id": 7,
            "name": "rol 1",
            "created_at": "2024-03-06T06:35:49",
            "permissions": [
              {
                "permission_id": 6,
                "module_name": "buzon",
                "name": "buzon"
              },
              {
                "permission_id": 8,
                "module_name": "monitoreo",
                "name": "monitoreo"
              }
            ],
            "id": 7
          },
          {
            "rol_id": 8,
            "name": "Rol 1",
            "created_at": "2024-03-06T06:36:48",
            "permissions": [
              {
                "permission_id": 6,
                "module_name": "buzon",
                "name": "buzon"
              },
              {
                "permission_id": 8,
                "module_name": "monitoreo",
                "name": "monitoreo"
              }
            ],
            "id": 8
          }
        ],
        "status_code": 200
      }
      
const permisos_codigo_id={
      'reportes':3,
      'cis':4,
      'acciones':5,
      'buzon':6,
      'admin':7,
      'monitor':8,
      'consola':9,
      'acciones_host':10,
      'acknownledge':11,
      'servidores_10':12,
      'servidores_19':14,
      'servidores_17':13,
      'servidores_18':15,
      'link_ticket':16

}

      export  {servidores_id,roles,permisos_codigo_id}