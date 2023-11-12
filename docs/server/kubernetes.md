

* [https://kubernetes.io/](https://kubernetes.io/)
* [https://kubernetes.io/docs/home/](https://kubernetes.io/docs/home/)


```
### notes ###
```
----
cheat sheet source - [https://github.com/dennyzhang/cheatsheet-kubernetes-A4](https://github.com/dennyzhang/cheatsheet-kubernetes-A4)
## Common Commands


## Events & Metrics

| Name                            | Command                                                 |
| ------------------------------- | ------------------------------------------------------- |
| View all events                 | `kubectl get events --all-namespaces`                   |
| List Events sorted by timestamp | kubectl get events –sort-by=.metadata.creationTimestamp |

## Node Maintenance

| Name                                      | Command                       |
| ----------------------------------------- | ----------------------------- |
| Mark node as unschedulable                | `kubectl cordon $NDOE_NAME`   |
| Mark node as schedulable                  | `kubectl uncordon $NDOE_NAME` |
| Drain node in preparation for maintenance | `kubectl drain $NODE_NAME`    |

## Namespace & Security

| Name                                                                                    | Command                                                                                            |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| List authenticated contexts                                                             | `kubectl config get-contexts`, `~/.kube/config`                                                    |
| Set namespace preference                                                                | `kubectl config set-context <context_name> --namespace=<ns_name>`                                  |
| Load context from config file                                                           | `kubectl get cs --kubeconfig kube_config.yml`                                                      |
| Switch context                                                                          | `kubectl config use-context <cluster-name>`                                                        |
| Delete the specified context                                                            | `kubectl config delete-context <cluster-name>`                                                     |
| List all namespaces defined                                                             | `kubectl get namespaces`                                                                           |
| List certificates                                                                       | `kubectl get csr`                                                                                  |
| [Check user privilege](https://kubernetes.io/docs/concepts/policy/pod-security-policy/) | kubectl –as=system:serviceaccount:ns-denny:test-privileged-sa -n ns-denny auth can-i use pods/list |
| [Check user privilege](https://kubernetes.io/docs/concepts/policy/pod-security-policy/) | `kubectl auth can-i use pods/list`                                                                 |
| Reference                                                                               | [Link: kubernetes yaml templates](https://cheatsheet.dennyzhang.com/kubernetes-yaml-templates)     |

## Network

| Name                              | Command                                                  |
| --------------------------------- | -------------------------------------------------------- |
| Temporarily add a port-forwarding | `kubectl port-forward redis-134 6379:6379`               |
| Add port-forwaring for deployment | `kubectl port-forward deployment/redis-master 6379:6379` |
| Add port-forwaring for replicaset | `kubectl port-forward rs/redis-master 6379:6379`         |
| Add port-forwaring for service    | `kubectl port-forward svc/redis-master 6379:6379`        |
| Get network policy                | `kubectl get NetworkPolicy`                              |

## Patch

| Name                          | Summary                                                               |
| ----------------------------- | --------------------------------------------------------------------- |
| Patch service to loadbalancer | `kubectl patch svc $svc_name -p '{"spec": {"type": "LoadBalancer"}}'` |

## Extenstions

| Name                                    | Summary                    |
| --------------------------------------- | -------------------------- |
| Enumerates the resource types available | `kubectl api-resources`    |
| List api group                          | `kubectl api-versions`     |
| List all CRD                            | `kubectl get crd`          |
| List storageclass                       | `kubectl get storageclass` |


## Components & Services

### Services on Master Nodes

| Name                                                                                                        | Summary                                                                                                |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [kube-apiserver](https://github.com/kubernetes/kubernetes/tree/master/cmd/kube-apiserver)                   | exposes the Kubernetes API from master nodes                                                           |
| [etcd](https://coreos.com/etcd/)                                                                            | reliable data store for all k8s cluster data                                                           |
| [kube-scheduler](https://github.com/kubernetes/kubernetes/tree/master/cmd/kube-scheduler)                   | schedule pods to run on selected nodes                                                                 |
| [kube-controller-manager](https://github.com/kubernetes/kubernetes/tree/master/cmd/kube-controller-manager) | node controller, replication controller, endpoints controller, and service account & token controllers |

### Services on Worker Nodes

| Name                                                                              | Summary                                                                                                                                     |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [kubelet](https://github.com/kubernetes/kubernetes/tree/master/cmd/kubelet)       | makes sure that containers are running in a pod                                                                                             |
| [kube-proxy](https://github.com/kubernetes/kubernetes/tree/master/cmd/kube-proxy) | perform connection forwarding                                                                                                               |
| [Container Runtime](https://github.com/docker/engine)                             | Kubernetes supported runtimes: Docker, rkt, runc and any [OCI runtime-spec](https://github.com/opencontainers/runtime-spec) implementation. |

### Addons: pods and services that implement cluster features

| Name                          | Summary                                                                   |
| ----------------------------- | ------------------------------------------------------------------------- |
| DNS                           | serves DNS records for Kubernetes services                                |
| Web UI                        | a general purpose, web-based UI for Kubernetes clusters                   |
| Container Resource Monitoring | collect, store and serve container metrics                                |
| Cluster-level Logging         | save container logs to a central log store with search/browsing interface |

### Tools

| Name                                                                         | Summary                                                                                 |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [kubectl](https://github.com/kubernetes/kubernetes/tree/master/cmd/kubectl)  | the command line util to talk to k8s cluster                                            |
| [kubeadm](https://github.com/kubernetes/kubernetes/tree/master/cmd/kubeadm)  | the command to bootstrap the cluster                                                    |
| [kubefed](https://kubernetes.io/docs/reference/setup-tools/kubefed/kubefed/) | the command line to control a Kubernetes Cluster Federation                             |
| Kubernetes Components                                                        | [Link: Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/) |
