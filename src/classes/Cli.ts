// importing classes from other files
import inquirer, { Answers, QuestionCollection } from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";



let allQuestions  = [
  {
    type: 'list',
    name: 'action',
    message: 'Select an action',
    choices: [''],
  },
]

const carQuestions = [
  {
    type: 'list',
    name: 'action',
    message: 'Select an action',
    // TODO: add options to tow and wheelie
    choices: [ 
      'Print details',
      'Start vehicle',
      'Accelerate 5 MPH',
      'Decelerate 5 MPH',
      'Stop vehicle',
      'Turn right',
      'Turn left',
      'Reverse',
      'Select or create another vehicle',
      'Exit',
    ],
  },
]

const truckQuestions = [
  {
    type: 'list',
    name: 'action',
    message: 'Select an action',
    // TODO: add options to tow and wheelie
    choices: [ 
      'Print details',
      'Start vehicle',
      'Accelerate 5 MPH',
      'Decelerate 5 MPH',
      'Stop vehicle',
      'Turn right',
      'Turn left',
      'Reverse',
      'Tow',
      'Select or create another vehicle',
      'Exit',
    ],
  },
]

const motorbikeQuestions = [
  {
    type: 'list',
    name: 'action',
    message: 'Select an action',
    // TODO: add options to tow and wheelie
    choices: [ 
      'Print details',
      'Start vehicle',
      'Accelerate 5 MPH',
      'Decelerate 5 MPH',
      'Stop vehicle',
      'Turn right',
      'Turn left',
      'Reverse',
      'wheelie',
      'Select or create another vehicle',
      'Exit',
    ],
  },
]


// define the Cli class
class Cli {
  // TODO: update the vehicles property to accept Truck and Motorbike objects as well
  // TODO: You will need to use the Union operator to define additional types for the array
  // TODO: See the AbleToTow interface for an example of how to use the Union operator
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  mySeleted: (Car | Truck | Motorbike)[];
  exit: boolean = false;

  // TODO: Update the constructor to accept Truck and Motorbike objects as well
  constructor(vehicles: (Car | Truck | Motorbike)[], mySeleted: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
    this.mySeleted = mySeleted;
  }

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers) => {

        // set the selectedVehicleVin to the vin of the selected vehicle
        this.selectedVehicleVin = answers.selectedVehicleVin;
        console.log('answers ' + answers.className);
        this.mySeleted = [];
        this.mySeleted.push(answers);

        // perform actions on the selected vehicle
        this.performActions();
      });
  }

  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          // TODO: Update the choices array to include Truck and Motorbike
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === 'Car') {
          // create a car
          this.createCar();
        }else if (answers.vehicleType === 'Truck'){
          this.createTruck();
        }else if (answers.vehicleType === 'Motorbike'){
          this.createMotorbike();
        }
        // TODO: add statements to create a truck or motorbike if the user selects the respective vehicle type
      });
  }

  // method to create a car
  createCar(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
      ])
      .then((answers) => {
        const car = new Car(
          // TODO: The generateVin method is static and should be called using the class name Cli, make sure to use Cli.generateVin() for creating a truck and motorbike as well!
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [],
          answers.towingCapacity
          
        );
        // push the car to the vehicles array
        this.vehicles.push(car);
        console.log('car' + car);
        this.mySeleted = [];
        this.mySeleted.push(car);

        // set the selectedVehicleVin to the vin of the car
        this.selectedVehicleVin = car.vin;
        // perform actions on the car
        this.performActions();
      });
  }

  // method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'towingCapacity',
          message: 'Enter Towing Capacity',
        },
      ])
      .then((answers) => {
        // TODO: Use the answers object to pass the required properties to the Truck constructor
        // TODO: push the truck to the vehicles array
        // TODO: set the selectedVehicleVin to the vin of the truck
        // TODO: perform actions on the truck

        const truck = new Truck(
          // TODO: The generateVin method is static and should be called using the class name Cli, make sure to use Cli.generateVin() for creating a truck and motorbike as well!
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [],
          parseInt(answers.towingCapacity),
        );
        // push the car to the vehicles array
        this.vehicles.push(truck);
        console.log('truck' + truck);
        this.mySeleted = [];
        this.mySeleted.push(truck);

        // set the selectedVehicleVin to the vin of the truck
        this.selectedVehicleVin = truck.vin;
        
        // perform actions on the truck
        this.performActions();

      });
  }

  // method to create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'frontWheelDiameter',
          message: 'Enter Front Wheel Diameter',
        },
        {
          type: 'input',
          name: 'frontWheelBrand',
          message: 'Enter Front Wheel Brand',
        },
        {
          type: 'input',
          name: 'rearWheelDiameter',
          message: 'Enter Rear Wheel Diameter',
        },
        {
          type: 'input',
          name: 'rearWheelBrand',
          message: 'Enter Rear Wheel Brand',
        },
      ])
      .then((answers) => {
        // TODO: Use the answers object to pass the required properties to the Motorbike constructor
        // TODO: push the motorbike to the vehicles array
        // TODO: set the selectedVehicleVin to the vin of the motorbike
        // TODO: perform actions on the motorbike

        const motorbike = new Motorbike(
         // TODO: The generateVin method is static and should be called using the class name Cli, make sure to use Cli.generateVin() for creating a truck and motorbike as well!
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [],
          answers.towingCapacity
         );


        // const motorbike1Wheels = [new Wheel(answers.frontWheelDiameter, answers.frontWheelBrand), new Wheel(answers.rearWheelDiameter, answers.rearWheelBrand)];
        
        // motorbike.wheels.push(motorbike1Wheels);

        // push the car to the vehicles array
        this.vehicles.push(motorbike);
        console.log('motorbike' + motorbike);
        this.mySeleted = [];
        this.mySeleted.push(motorbike);


        // set the selectedVehicleVin to the vin of the truck
        this.selectedVehicleVin = motorbike.vin;
        // perform actions on the truck
        this.performActions();

      });
  }

  // method to find a vehicle to tow
  // TODO: add a parameter to accept a truck object
  findVehicleToTow(truck: Truck, index: number): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTow',
          message: 'Select a vehicle to tow',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle,
            };
          }),
        },
      ])
      .then((answers) => {

        // TODO: check if the selected vehicle is the truck
        // TODO: if it is, log that the truck cannot tow itself then perform actions on the truck to allow the user to select another action
        // TODO: if it is not, tow the selected vehicle then perform actions on the truck to allow the user to select another action
        // if the object they choose is a truck then don't tow


        if(this.selectedVehicleVin == answers.vehicleToTow.vin){
          console.log('the truck cannot tow itself');
          this.performActions(); 
          return;                       
        }else{
           truck.tow(answers.vehicleToTow);
           this.performActions(); 
           return;    
        }
        
      });
  }

  findWheelie(motorbike: Motorbike): void {
    
    console.log('motorbike.make: ' + motorbike.make);
    console.log('motorbike.make: ' + motorbike.model);
    //motorbike.wheelie(motorbike.make, motorbike.model)
  }
  


  // method to perform actions on a vehicle
  performActions(): void {

    let myClass: string = "";
    let index: number = 0;

    for (let i = 0; i < this.vehicles.length; i++) {
      if (this.vehicles[i].vin === this.selectedVehicleVin) {
        myClass = this.vehicles[i].className;
        index = i;
      }
    }

    switch(myClass) {
      case 'Car':
        allQuestions = carQuestions;
        break;
      case 'Truck':
        allQuestions = truckQuestions;
        break;
      case 'Motorbike':
        allQuestions = motorbikeQuestions;
        break;
      default:
        
    }

    inquirer
      .prompt(allQuestions)
      .then((answers) => {
        


        console.log("this.selectedVehicleVin: " + this.mySeleted[0].className);
       
        // perform the selected action
        if (answers.action === 'Print details') {
          // find the selected vehicle and print its details
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].printDetails();
            }
          }
        } else if (answers.action === 'Start vehicle') {
          // find the selected vehicle and start it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].start();
            }
          }
        } else if (answers.action === 'Accelerate 5 MPH') {
          // find the selected vehicle and accelerate it by 5 MPH
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].accelerate(5);
            }
          }
        } else if (answers.action === 'Decelerate 5 MPH') {
          // find the selected vehicle and decelerate it by 5 MPH
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].decelerate(5);
            }
          }
        } else if (answers.action === 'Stop vehicle') {
          // find the selected vehicle and stop it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].stop();
            }
          }
        } else if (answers.action === 'Turn right') {
          // find the selected vehicle and turn it right
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].turn('right');
            }
          }
        } else if (answers.action === 'Turn left') {
          // find the selected vehicle and turn it left
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].turn('left');
            }
          }
        } else if (answers.action === 'Reverse') {
          // find the selected vehicle and reverse it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].reverse();
            }
          }
        }
        else if (answers.action === 'Tow') {     

          // TODO: add statements to perform the tow action only if the selected vehicle is a truck.
          // Call the findVehicleToTow method to find a vehicle to tow and pass the selected truck as an argument.
          // After calling the findVehicleToTow method, you will need to return to avoid instantly calling the performActions
          // method again since findVehicleToTow is asynchronous.

  
          if(myClass == "Truck"){
            this.findVehicleToTow(this.vehicles[index], index);
            return;
          }       


        }else if (answers.action === 'wheelie') {     
          // TODO: add statements to perform the wheelie action only if the selected vehicle is a motorbike
          // start the cli to return to the initial prompt if the user wants to select or create another vehicle

          if(myClass == "Motorbike"){
            this.vehicles[index].wheelie(this.vehicles[index].make, this.vehicles[index].model)
            this.startCli();
            return;
          }else{ 
            this.startCli();
            return;
          }    
        } 

        else if (answers.action === 'Select or create another vehicle') {
          // start the cli to return to the initial prompt if the user wants to select or create another vehicle
          this.startCli();
          return;
        } else {
          // exit the cli if the user selects exit
          this.exit = true;
        }
        if (!this.exit) {
          // if the user does not want to exit, perform actions on the selected vehicle
          this.performActions();
        }
      });
  }

  // method to start the cli
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        // check if the user wants to create a new vehicle or select an existing vehicle
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

// export the Cli class
export default Cli;
