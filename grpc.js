const grpc = require('@grpc/grpc-js')

const readProtoFile = (filePath, packageName) => {
    // compiling proto file
    const proto = require('@grpc/proto-loader')
    const protoFile = proto.loadSync(filePath, {})
    const protoBuffer = grpc.loadPackageDefinition(protoFile)
    
    // extracting buffer protocol package
    return protoBuffer[packageName]
}

// packageObject datatype is equal to previous method result datatype
const generateInsecureClient = (packageObject, serviceName, domain) => { 
    const credentials = grpc.credentials.createInsecure()
    const client = new packageObject[serviceName](domain, credentials)
    return client
}

module.exports = { readProtoFile, generateInsecureClient }