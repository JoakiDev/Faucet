CREAR CUENTA
docker run -it -v ${PWD}/password.txt:/password -v ${PWD}/data:/data ethereum/client-go:latest account new --datadir /data --password /password

INICIALIZAR BASE DE DATOS DE LA BLOCKCHAIN CON EL FICHERO GENESIS
docker run -it -v ${PWD}/genesis.json:/genesis.json -v ${PWD}/data:/data ethereum/client-go:latest init --datadir /data /genesis.json

CREAR CONTENEDOR DE LA BLOCKCHAIN
docker run -it --name eth-node-9999 -v ${PWD}/password.txt:/password -p 9999:8545 -v ${PWD}/data:/data ethereum/client-go:latest \
--datadir /data --allow-insecure-unlock \
--miner.etherbase 0f900671fd1d00a435ae9a6ff0aacfc0e239202f \
--mine \
--unlock "0f900671fd1d00a435ae9a6ff0aacfc0e239202f" \
--password /password \
--http \
--http.addr "0.0.0.0" \
--http.port 8545 \
--http.corsdomain "*" \
--http.api "admin,eth,debug,miner,net,txpool,personal,web3"