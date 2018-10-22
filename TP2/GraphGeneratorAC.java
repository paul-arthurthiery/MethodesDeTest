package TP2;

import edu.princeton.cs.algs4.Graph;
import edu.princeton.cs.algs4.GraphGenerator;

import static org.junit.jupiter.api.Assertions.*;

class GraphGeneratorAC {
    @org.junit.jupiter.api.BeforeEach
    void setUp() {
    }

    @org.junit.jupiter.api.AfterEach
    void tearDown() {
    }

    @org.junit.jupiter.api.Test
    /*
    simple() prend 2 entrées: V et E

    V peut être n'importe quel int positif ou nul
    E doit valoir entre 0 et V*(V-1)/2

    On a donc pour V: min-(-1), min(0), V(1 à 2147483647)
    pour E: min-(-1), min(0), E(1 à (V*(V-1)/2-1)), max(V*(V-1)/2), max+(1+(V*(V-1)/2))

    Nous avons donc 7 cas de test : V1, E1, V2E2, V3E2, V3E3, V3E4, E5
    */
    void simpleVE() {

        // V1 <{ V = -1 }, { erreur }>
        Throwable negativeVertex = assertThrows(IllegalArgumentException.class,() -> {
                    GraphGenerator.simple(-1, 0);
        });
        //E1 <{ E = -1 }, { erreur }>
        Throwable negativeEdge = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.simple(0, -1);
        });

        //V2E2 <{ V = 0, E = 0 }, { correct }>
        assertEquals(GraphGenerator.simple(0,0).V(), 0);
        assertEquals(GraphGenerator.simple(0,0).E(), 0);

        //V3E2 <{ V = 25, E = 0 }, { correct }>
        assertEquals(GraphGenerator.simple(25,0).V(), 25);
        assertEquals(GraphGenerator.simple(25,0).E(), 0);

        //V3E3 <{ V = 25, E = 30 }, { correct }>
        assertEquals(GraphGenerator.simple(25,30).V(), 25);
        assertEquals(GraphGenerator.simple(25,30).E(), 30);

        //V3E4 <{ V = 25, E = 300 }, { correct }>
        assertEquals(GraphGenerator.simple(25,300).V(), 25);
        assertEquals(GraphGenerator.simple(25,300).E(), 300);

        //E5 <{ V = 12, E = 67 }, { erreur }>
        Throwable tooManyEdges = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.simple(12, 67);
        });
    }

    @org.junit.jupiter.api.Test
    /*
    simple() prend 2 entrées: V et p

    V peut être n'importe quel int positif ou nul
    p doit valoir entre 0 1

    On a donc pour V: min-(-1), min(0), V(1 à 2147483647)
    pour p: min-(-1.0), min(0.0), p(0.01 à 0.99), max(1.0), max+(1.1)

    Nous avons donc 7 cas de test : V1, P1, V2P2, V2P3, V3P3, V3P4, P5
    */
    void simpleVp() {
        //V1 <{ V = -1 }, { erreur }>
        Throwable negativeVertex = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.simple(-1, 0.0);
        });
        //P1 <{ p = -1.0 }, { erreur }>
        Throwable negativeProbability = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.simple(0, -1.0);
        });
        //V2P2 <{ V = 0, p = 0.0 }, { correct }>
        assertEquals(GraphGenerator.simple(0,0.0).V(), 0);
        assertEquals(GraphGenerator.simple(0,0.0).E(), 0);

        //V2P3 <{ V = 0, p = 0.5 }, { correct }>
        assertEquals(GraphGenerator.simple(0,0.5).V(), 0);
        assertEquals(GraphGenerator.simple(0,0.5).E(), 0);

        //V3P3 <{ V = 25, p = 0.5 }, { correct }>
        assertEquals(GraphGenerator.simple(25,0.5).V(), 25);

        //V3P4 <{ V = 12, p = 1.0 }, { correct }>
        assertEquals(GraphGenerator.simple(12,1.0).V(), 12);
        assertEquals(GraphGenerator.simple(12,1.0).E(), 66);

        //P5 <{ V = 12, p = 1.1 }, { correct }>
        Throwable probabilityTooBig = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.simple(12, 1.1);
        });
    }

    @org.junit.jupiter.api.Test
    /*
    bipartite() prend 3 entrées: V1, V2 et E

    V1 et V2 peuvent être n'importe quel int positif ou nul
    E doit être entre 0 et V1*V2

    On a donc pour V1 et V2: min-(-1), min(0), V(1 à 2147483647)
    pour E: min-(-1), min(0), E(1 à (V1*V2)-1), max(V1*V2), max+((V1*V2)+1)

    Nous avons donc 10 cas de test : V1-1, V2-1, E1, V1-2 V2-2 E2, V1-3 V2-2 E2, V1-2 V2-3 E2,
    //                               V1-3 V2-3 E3, V1-3 V2-3 E4, V1-3 V2-3 E3, E5
    */
    void bipartiteVVE() {

        //V11 <{ V1 = 0 }, { erreur }>
        Throwable negativeVertex1 = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.bipartite(-1, 0, 0);
        });

        //V21 <{ V2= -1 }, { erreur }>
        Throwable negativeVertex2 = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.bipartite(0, -1, 0);
        });

        //E1 <{ E = -1 }, { erreur }>
        Throwable negativeEdge = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.bipartite(0, 0, -1);
        });

        //V12V22E2 <{ V1 = 0, V2= 0, E = 0 }, { correct }>
        assertEquals(GraphGenerator.bipartite(0,0, 0).V(), 0);
        assertEquals(GraphGenerator.bipartite(0,0, 0).E(), 0);

        //V13V22E2 <{ V1 = 25, V2= 0, E = 0 }, { correct }>
        assertEquals(GraphGenerator.bipartite(25,0, 0).V(), 25);
        assertEquals(GraphGenerator.bipartite(25,0, 0).E(), 0);

        //V12V23E2 <{ V1 = 0, V2= 25, E = 0 }, { correct }>
        assertEquals(GraphGenerator.bipartite(0,25, 0).V(), 25);
        assertEquals(GraphGenerator.bipartite(0,25, 0).E(), 0);

        //V12V23E2 <{ V1 = 25, V2= 25, E = 0 }, { correct }>
        assertEquals(GraphGenerator.bipartite(25,25, 0).V(), 50);
        assertEquals(GraphGenerator.bipartite(25,25, 0).E(), 0);


        //V13V23E3 <{ V1 = 25, V2= 25, E = 15 }, { correct }>
        assertEquals(GraphGenerator.bipartite(25,25, 15).V(), 50);
        assertEquals(GraphGenerator.bipartite(25,25, 15).E(), 15);

        //V13V23E4 <{ V1 = 25, V2= 25, E = 625 }, { correct }>
        assertEquals(GraphGenerator.bipartite(25,25, 625).V(), 50);
        assertEquals(GraphGenerator.bipartite(25,25, 625).E(), 625);

        //E5
        Throwable tooManyEdges = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.bipartite(10, 10, 101);
        });
    }

    @org.junit.jupiter.api.Test
    /*
    bipartite() prend 3 entrées: V1, V2 et p

    V1 et V2 peuvent être n'importe quel int positif ou nul
    p doit valoir entre 0 1

    On a donc pour V1 et V2: min-(-1), min(0), V(1 à 2147483647)
    pour p: min-(-1.0), min(0.0), p(0.01 à 0.99), max(1.0), max+(1.1)

    Nous avons donc 16 cas de test : V1-1, V1-2, p1,
    //                               V1-2 V2-2 p2, V1-2 V2-2 p3, V1-2 V2-2 p4
    //                               V1-2 V2-3 p2, V1-2 V2-3 p3, V1-2 V2-3 p4
    //                               V1-3 V2-2 p2, V1-3 V2-2 p3, V1-3 V2-2 p4
    //                               V1-3 V2-3 p2, V1-3 V2-3 p3, V1-3 V2-3 p4
    //                               p5
    */
    void bipartiteVVp() {
        //V11 <{ V1 = -1 }, { erreur }>
        Throwable negativeVertex1 = assertThrows(NegativeArraySizeException.class,() -> {
            GraphGenerator.bipartite(-1, 0, 0.0);
        });

        //V21 <{ V2 = -1 }, { erreur }>
        Throwable negativeVertex2 = assertThrows(NegativeArraySizeException.class,() -> {
            GraphGenerator.bipartite(0, -1, 0.0);
        });

        //P1 <{ p = -1.0 }, { erreur }>
        Throwable negativeProbability = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.bipartite(0, 0,-1.0);
        });

        //V12V22P2 <{ V1 = 0, V2= 0, E = 0.0 }, { correct }>
        assertEquals(GraphGenerator.bipartite(0, 0,0.0).V(), 0);
        assertEquals(GraphGenerator.bipartite(0,0, 0.0).E(), 0);

        //V12V22P3 <{ V1 = 0, V2= 0, E = 0.5 }, { correct }>
        assertEquals(GraphGenerator.bipartite(0, 0,0.5).V(), 0);
        assertEquals(GraphGenerator.bipartite(0,0, 0.5).E(), 0);

        //V12V22P4 <{ V1 = 0, V2= 0, E = 1.0 }, { correct }>
        assertEquals(GraphGenerator.bipartite(0, 0,1.0).V(), 0);
        assertEquals(GraphGenerator.bipartite(0,0, 1.0).E(), 0);

        //V13V22P2 <{ V1 = 25, V2= 0, E = 0.0 }, { correct }>
        assertEquals(GraphGenerator.bipartite(25, 0,0.0).V(), 25);
        assertEquals(GraphGenerator.bipartite(25,0, 0.0).E(), 0);

        //V13V22P3 <{ V1 = 25, V2= 0, E = 0.5 }, { correct }>
        assertEquals(GraphGenerator.bipartite(25, 0,0.5).V(), 25);
        assertEquals(GraphGenerator.bipartite(25,0, 0.5).E(), 0);

        //V13V22P4 <{ V1 = 25, V2= 0, E = 1.0 }, { correct }>
        assertEquals(GraphGenerator.bipartite(25, 0,1.0).V(), 25);
        assertEquals(GraphGenerator.bipartite(25,0, 1.0).E(), 0);

        //V12V23P2 <{ V1 = 0, V2= 25, E = 0.0 }, { correct }>
        assertEquals(GraphGenerator.bipartite(0, 25,0.0).V(), 25);
        assertEquals(GraphGenerator.bipartite(0,25, 0.0).E(), 0);

        //V12V23P3 <{ V1 = 0, V2= 25, E = 0.5 }, { correct }>
        assertEquals(GraphGenerator.bipartite(0, 25,0.5).V(), 25);
        assertEquals(GraphGenerator.bipartite(0,25, 0.5).E(), 0);

        //V12V23P4 <{ V1 = 0, V2= 25, E = 1.0 }, { correct }>
        assertEquals(GraphGenerator.bipartite(0, 25,1.0).V(), 25);
        assertEquals(GraphGenerator.bipartite(0,25, 1.0).E(), 0);

        //V13V23P2 <{ V1 = 25, V2= 25, E = 0.0 }, { correct }>
        assertEquals(GraphGenerator.bipartite(25, 25, 0.0).V(), 50);
        assertEquals(GraphGenerator.bipartite(25, 25, 0.0).E(), 0);

        //V13V23P3 <{ V1 = 25, V2= 25, E = 0.5 }, { correct }>
        assertEquals(GraphGenerator.bipartite(25, 25, 0.5).V(), 50);

        //V13V23P4 <{ V1 = 25, V2= 25, E = 1.0 }, { correct }>
        assertEquals(GraphGenerator.bipartite(12,12, 1.0).V(), 24);
        assertEquals(GraphGenerator.bipartite(12, 12,1.0).E(), 144);

        //P5 <{ E = 1.1 }, { erreur }>
        Throwable probabilityTooBig = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.bipartite(12, 12, 1.1);
        });
    }

    @org.junit.jupiter.api.Test
    /*
    regular() prend 2 entrées: V et k

    V peut être n'importe quel int positif ou nul
    k peut etre entre 0 et V+2 mais k*V doit être pair (pas d'edge qui ne vont nul part)

    On a donc pour V1: min-(-1), min(0), V(1 à 2147483647)
    pour k: min(0), k(1 à 2147483647) err(V*k%2 != 0)

    Nous avons donc 6 cas de test : V1, V2K1, V3K2, K3
    */
    void regular() {

        //V1 <{ V = -1 }, { erreur }>
        Throwable negativeVertex = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.regular(-1, 0);
        });

        //V2K1 <{ V = 0, k = 0 }, { correct }>
        assertEquals(GraphGenerator.regular(0,0).V(), 0);
        assertEquals(GraphGenerator.regular(0,0).E(), 0);

        //V2K2 <{ V = 0, k = 4 }, { correct }>
        assertEquals(GraphGenerator.regular(0,4).V(), 0);
        assertEquals(GraphGenerator.regular(0,4).E(), 0);

        //V3K1 <{ V = 10, k = 0 }, { correct }>
        assertEquals(GraphGenerator.regular(10,0).V(), 10);
        assertEquals(GraphGenerator.regular(10,0).E(), 0);

        //V3K2 <{ V = 10, k = 2 }, { correct }>
        assertEquals(GraphGenerator.regular(10,2).V(), 10);
        assertEquals(GraphGenerator.regular(10,2).E(), 10);

        //K3 <{ k = 3 }, { erreur }>
        Throwable oddDegreeTimesEdges = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.regular(3, 3);
        });
    }

}