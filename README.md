# KEBSmartFarm

# Project UML Class Diagram

```mermaid
classDiagram
    class User {
        -id : String
        -pw : String
				-nickname : String
				-email : String
				-phonenum : String
				-name : String
        -arduinoKits : ArduinoKit[*]
        -userPlants : UserPlants[*]
    }

    class ArduinoKit {
        -serial_num : String
        -registerDate : String
        -qr_code : String
        -deviceName : String
        +sendSensorData()
        +receiveCommand(command: String): String
    }

    class UserPlants {
        -plant_harvest_date : String
    }

    class Plant {
        -PlantNo : String
        -PlantName : String
        -PlantState : char
        -PlantRegDate : String
    }

    class PlantSystemFacade {
        - managePlantWeb : ManagePlantWeb
        +login()
        +addArduinoHardware(ArduinoHardware)
        +getSensorData()
        +addPlant(Plant)
        +controlBrightness()
        +takePicture()
    }

    class ManagePlantWeb {
        +loginInternal()
        +registerArduinoHardwareInternal(ArduinoHardware)
        +retrieveSensorDataInternal()
        +savePlantInternal(Plant)
        +controlBrightnessInternal()
        +takePictureInternal()
        +sendCommandArduino(command: String): String
    }

    User "1" *-- "N" ArduinoKit : has
    User "1" *-- "N" UserPlants : has
    User "1" *-- "1" PlantSystemFacade : uses
    Plant "1" o-- "N" UserPlants : related
    ArduinoKit "1" o-- "1" Plant : related
    PlantSystemFacade o-- ManagePlantWeb : uses
    ManagePlantWeb o-- ArduinoKit : controls
```

# Project ER Diagram

```mermaid
erDiagram
  Users ||--|{ ArduinoKit : has
  Users ||--|{ UserPlants : has
  Plant ||--|{ UserPlants : related
  ArduinoKit ||--|{ Plant : related
  ArduinoKit ||--|{ SensorData : contains

  Users {
    varchar(50) id PK
    varchar(50) pw
    varchar(50) nickname
    varchar(50) email
    varchar(50) phonenum
    varchar(50) name
  }

  ArduinoKit {
    varchar(100) serial_num PK
    DATETIME registerDate
    varchar(300) qr_code
    varchar(50) deviceName
  }

  UserPlants{
    varchar(10) id PK
    varchar(50) userId FK
    varchar(10) PlantNo FK
    DATETIME plant_harvest_date
  }

  Plant {
    varchar(10) PlantNo PK
    varchar(50) PlantName
    char(1) PlantState
    DATETIME PlantRegDate
  }

  SensorData {
    bigint id PK
    varchar(100) kit_serial_num FK
    float humidity
    float temperature
    float brightness
    DATETIME date
  }
```
