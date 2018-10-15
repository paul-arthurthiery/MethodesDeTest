package Tests;

import edu.princeton.cs.algs4.Graph;
import edu.princeton.cs.algs4.GraphGenerator;

import static org.junit.jupiter.api.Assertions.*;

class GraphGeneratorTest {
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
    Nous avons donc 6 cas de test : V1, E1, V2E2, V3E3, V3E4, E5
    */
    void simpleVE() {
        //V1
        Throwable negativeVertex = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.simple(-1, 0);
        });
        //E1
        Throwable negativeEdge = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.simple(0, -1);
        });
        //V2E2
        assertEquals(GraphGenerator.simple(0,0).V(), 0);
        assertEquals(GraphGenerator.simple(0,0).E(), 0);
        //V3E3
        assertEquals(GraphGenerator.simple(25,30).V(), 25);
        assertEquals(GraphGenerator.simple(25,30).E(), 30);
        //V3E4
        assertEquals(GraphGenerator.simple(12,66).V(), 12);
        assertEquals(GraphGenerator.simple(12,66).E(), 66);
        //E5
        Throwable tooManyEdges = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.simple(12, 11);
        });
    }

    @org.junit.jupiter.api.Test
    /*
    simple() prend 2 entrées: V et p
    V peut être n'importe quel int positif ou nul
    p doit valoir entre 0 1
    On a donc pour V: min-(-1), min(0), V(1 à 2147483647)
    pour p: min-(-1.0), min(0.0), p(0.01 à 0.99), max(1.0), max+(1.1)
    Nous avons donc 6 cas de test : V1, P1, V2P2, V3P3, V3P4, P5
    */
    void simpleVp() {
        //V1
        Throwable negativeVertex = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.simple(-1, 0.0);
        });
        //P1
        Throwable negativeProbability = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.simple(0, -1.0);
        });
        //V2P2
        assertEquals(GraphGenerator.simple(0,0.0).V(), 0);
        assertEquals(GraphGenerator.simple(0,0.0).E(), 0);
        //V3P3
        assertEquals(GraphGenerator.simple(25,0.5).V(), 25);
        //V3P4
        assertEquals(GraphGenerator.simple(12,1.0).V(), 12);
        assertEquals(GraphGenerator.simple(12,1.0).E(), 66);
        //P5
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
    Nous avons donc 7 cas de test : V11, V12, E1, V12V22E2, V13V23E3, V13V23E4, E5
    */
    void bipartiteVVE() {
        //V11
        Throwable negativeVertex1 = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.bipartite(-1, 0, 0);
        });
        //V21
        Throwable negativeVertex2 = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.bipartite(0, -1, 0);
        });
        //E1
        Throwable negativeEdge = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.bipartite(0, 0, -1);
        });
        //V12V22E2
        assertEquals(GraphGenerator.bipartite(0,0, 0).V(), 0);
        assertEquals(GraphGenerator.bipartite(0,0, 0).E(), 0);
        //V3E3
        assertEquals(GraphGenerator.bipartite(25,25, 100).V(), 50);
        assertEquals(GraphGenerator.bipartite(25,25, 100).E(), 100);
        //V3E4
        assertEquals(GraphGenerator.bipartite(10,10, 100).V(), 20);
        assertEquals(GraphGenerator.bipartite(10,10, 100).E(), 100);
        //E5
        Throwable tooManyEdges = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.bipartite(10, 10, 101);
        });
    }

    @org.junit.jupiter.api.Test
    void bipartiteVVp() {
    }

    @org.junit.jupiter.api.Test
    void regular() {
    }

}